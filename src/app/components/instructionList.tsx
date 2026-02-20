"use client";

import React, { useEffect, useState } from "react";
import { allInstructionsList } from "../lib/actions";
import Link from "next/link";
// import DateRangePicker from "./ui/NewCalendar";
import Image from "next/image";

interface InstructionDetails {
  id: number;
  bank_account_id: string;
  bank_account_details: {
    name: string;
    bank_code: string;
    account_number: string;
  };
  amount: string;
  state: string;
  rejection_reason: string;
  email: string;
  updated_at: string;
  description: string;
  reference: string;
  slug: string;
  created_at: string;
  receipt_url: string;
}

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
};

export default function InstructionList() {
  // State to manage the fetched instructions
  const [instructions, setInstructions] = useState<InstructionDetails[]>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(1);
  const [show,setShow] = useState(false)
  const [error, setError] = useState<string | null>(null);


  // State to manage sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InstructionDetails | null;
    direction: string;
  }>({
    key: "id",
    direction: "desc",
  });

  // Fetch instructions data
  useEffect(() => {
    const fetchInstructions = async () => {
      const result = await allInstructionsList(currentPage);
      if (result.ok) {
        const data = result.data as unknown as { results: InstructionDetails[]; meta: { pagination: { total_pages: number } } };
        setInstructions(data.results);
        setTotalPages(data.meta.pagination.total_pages);
        setError(null);
      } else {
        setError(result.error);
        setInstructions([]);
        setTotalPages(1);
      }
    };

    fetchInstructions();
  }, [currentPage]);

  // Sorting function
  const sortedInstructions = [...instructions].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
    }
    return 0;
  });

  // Toggle sorting
  const requestSort = (key: keyof InstructionDetails) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof InstructionDetails) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "▼";
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlerShow = ()=>{
    setShow(!show)
  }

  return (
    <>
    {error && (
      <div className="p-4 mb-4">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    )}
    <div className="flex gap-2">
    <div className="pl-4 flex gap-3 relative">
      <button onClick={()=>{handlerShow()}} className="text-black hover:underline bg-white px-2 rounded-lg space-x-2">Specific Transaction
      <Image
      className="inline-block ml-2"
        src={'/csv-file.png'}
        width={20}
        height={15}
        alt='csv'>
        </Image>
      </button>
      {/* {show && <DateRangePicker/>} */}
      
    
    </div>
    <div>
      
      
    </div>
    
    <div className='max-w-44 bg-white py-1 px-3 rounded-lg'>
        <Link
        className=''
        href={'https://chip.bytonbyte.com/api/allrangedate'}
        >
          <div className='flex items-center gap-3'>
          <p className='text-black'>All Transaction</p>
        <Image
        src={'/csv.png'}
        width={20}
        height={15}
        alt='csv'>

        </Image>
          </div>

        </Link>
      </div>
    </div>

      <div className="p-4">
        <div className="overflow-x-auto bg-white shadow rounded-md">
          <table className="min-w-full bg-gray-800">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("id")}>
                    ID {getSortIcon("id")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("bank_account_id")}>
                    Bank Account ID {getSortIcon("bank_account_id")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("amount")}>
                    Amount {getSortIcon("amount")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("email")}>
                    Email {getSortIcon("email")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("description")}>
                    Description {getSortIcon("description")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("reference")}>
                    Reference {getSortIcon("reference")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("state")}>
                    Status {getSortIcon("state")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("created_at")}>
                    Created Date {getSortIcon("created_at")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  <button onClick={() => requestSort("updated_at")}>
                    Updated Date {getSortIcon("updated_at")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
  {sortedInstructions.map((item, index) => (
    <tr key={item.id} className="border-b">
      {/* Global row number calculation */}
      <td className="px-6 py-4 text-white bg-gray-800">
        {(currentPage - 1) * 25 + index + 1}
      </td>
      <td className="px-6 py-4 text-white bg-gray-800">{item.id}</td>
      <td className="px-6 py-4 text-white bg-gray-800">{item.bank_account_id}</td>
      <td className="px-6 py-4 text-white bg-gray-800">{item.amount}</td>
      <td className="px-6 py-4 text-white bg-gray-800">{item.email}</td>
      <td className="px-6 py-4 text-white bg-gray-800">{item.description}</td>
      <td className="px-6 py-4 text-white bg-gray-800">{item.reference}</td>
      <td className="px-6 py-4 text-white bg-gray-800">{item.state}</td>
      <td className="px-6 py-4 text-white bg-gray-800">{formatDate(item.created_at)}</td>
      <td className="px-6 py-4 text-white bg-gray-800">{formatDate(item.updated_at)}</td>
      <td className="px-6 py-4 bg-gray-800">
        <Link href={`/dashboard/transaction/${item.id}`}>
          <p className="text-blue-400">More</p>
        </Link>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="text-white flex justify-center mt-4">
        <div className="space-x-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
