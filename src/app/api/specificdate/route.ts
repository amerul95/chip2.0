
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { generateAllCre } from "@/app/lib/actions";

export async function POST(req: Request) {
  const cre = generateAllCre();
  if (!cre.ok) {
    return NextResponse.json({ success: false, message: cre.error }, { status: 500 });
  }
  const { epochSecs, checksum, domain, apiKey } = cre;

  function formatDate(time: string) {
    const date = new Date(time);
    date.setHours(date.getHours() + 8);

    // Extract components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const body : any = await req.json();
  const { startDate, endDate } = body;

  if (!startDate || !endDate) {
    return NextResponse.json(
      { success: false, message: "startDate and endDate are required" },
      { status: 400 }
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return NextResponse.json(
      { success: false, message: "Invalid startDate or endDate" },
      { status: 400 }
    );
  }

  const response = await fetch(`${domain}/send/send_instructions`, {
    method: "GET",
    headers: {
      epoch: `${epochSecs}`,
      checksum: `${checksum}`,
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const firstData = await response.json();

  if (!firstData || !firstData.results) {
    return NextResponse.json(
      { success: false, message: "Invalid response" },
      { status: 500 }
    );
  }

  const totalPages = firstData.meta.pagination.total_pages;
  let allResults = [...firstData.results];

  // Fetch all pages
  for (let page = 2; page <= totalPages; page++) {
    const response = await fetch(`${domain}/send/send_instructions?page=${page}`, {
      method: "GET",
      headers: {
        epoch: `${epochSecs}`,
        checksum: `${checksum}`,
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const pageData = await response.json();
    if (pageData && pageData.results) {
      allResults = [...allResults, ...pageData.results];
    }
  }

  try {
    // Filter results based on the date range
    const filteredResults = allResults.filter((item: any) => {
      const createdAt = new Date(item.created_at);
      return createdAt >= start && createdAt <= end;
    });

    // Map data to an array of objects for xlsx
    const rows = filteredResults.map((item: any) => ({
      ID: item.id,
      Bank_Account_ID: item.bank_account_id,
      Amount: parseFloat(item.amount) || 0,
      State: item.state,
      Email: item.email,
      Description: item.description,
      Reference: item.reference,
      Created_At: formatDate(item.created_at),
      Updated_At: formatDate(item.updated_at),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate buffer from workbook
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Create a response with the buffer as the body
    return new Response(buffer, {
      headers: {
        "Content-Disposition": 'attachment; filename="data.xlsx"',
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing data:", error);
    return NextResponse.json({ error: "Failed to process data" }, { status: 500 });
  }
}