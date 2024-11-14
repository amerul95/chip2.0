import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: any) {
  try {
    // Parse JSON body from the request
    const { log, role, login, amount, ipAddress, location } = await req.json();

    const newUser = await prisma.user.create({
      data: {
        log,
        role,
        login,
        amount,
        ipAddress,
        location,
      },
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Unable to create user" }, { status: 500 });
  }
}
