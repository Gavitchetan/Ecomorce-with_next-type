



import { getCurretnUser } from "@/actions/getCurrentUser";
import { UploadedImgeType } from "@/app/(site)/admin/add-products/Addproudctform";
// import Prisma from "@/libs/prismadb";
import prisma from "@/libs/prismadb"
import axios from "axios";
import { error } from "console";

import { NextResponse } from "next/server";



export const PUT = async (request: Request) => {

    try {

        const user = await getCurretnUser();

        if (!user || user.Role !== "admin") {
            return NextResponse.error();
        }
        const body = await request.json();
        const { id, deliveryStatus } = body;
        const updatedProduct = await prisma.order.update({
            where: { id: id },
            data: { deliveryStatus: deliveryStatus }
        })
        return NextResponse.json({
            updatedProduct: updatedProduct
        })
    } catch (error) {
        return NextResponse.error()
    }
}

export const DELETE = async (request: Request) => {
    const user = await getCurretnUser();


    try {
        if (!user || user.Role !== "admin") {
            return NextResponse.error();
        }

        const body = await request.json();
        const { id } = body;
        const updatedProduct = await prisma.product.delete({
            where: { id: id }
        })
        return NextResponse.json({
            message: 'product is deleted succsfully'
        })
    } catch (error) {
        return NextResponse.error()
    }
}