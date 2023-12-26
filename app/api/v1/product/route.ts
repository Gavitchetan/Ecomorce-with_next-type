



import { getCurretnUser } from "@/actions/getCurrentUser";
import { UploadedImgeType } from "@/app/(site)/admin/add-products/Addproudctform";
// import Prisma from "@/libs/prismadb";
import prisma from "@/libs/prismadb"
import axios from "axios";
import { error } from "console";

import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        console.log('api is hited')
        const isUSer = await getCurretnUser()


        if (!isUSer || isUSer.Role !== "admin") {
            return NextResponse.json({
                Errors: "Your Your not admin  your not allowed there Beaause Accee "
            })
        }

        const body = await request.json()
        // console.log(body, 'bodydata')
        const {
            name,
            brand,
            description,
            price,
            inStock,
            images,
            category,

        } = body;
        console.log(body)
        const product = await prisma.product.create({
            data: {
                name,
                brand,
                description: description,
                price: Number(price),
                inStock,
                images: images,
                category: category,
            }
        })
        return NextResponse.json({
            product
        })
    } catch (error) {
        return NextResponse.json({
            error: "An InterNal Server Error"
        })
    }
}


export const PUT = async (request: Request) => {

    try {

        const user = await getCurretnUser();

        if (!user || user.Role !== "admin") {
            return NextResponse.error();
        }
        const body = await request.json();
        const { id, inStock } = body;
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: { inStock }
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