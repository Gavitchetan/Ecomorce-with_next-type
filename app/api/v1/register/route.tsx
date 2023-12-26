import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const body = await request.json()
        const { name, email, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email, hashedPassword: hashedPassword, name
            }
        })
        return NextResponse.json({
            user: user
        })
    } catch (error) {
        return NextResponse.json(error)
    }
} 