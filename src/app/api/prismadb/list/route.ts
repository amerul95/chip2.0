import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){

    try {
        const user = await prisma.user.findMany();
        return NextResponse.json(user,{status:200})
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Unable to fetch users" },{status:500});
    }

}