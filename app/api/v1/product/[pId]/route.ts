// Import necessary modules
import { getCurretnUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

// Define the DELETE handler
export const DELETE = async (request: Request, { params }: { params: { pId: string } }) => {
    // Get the current user
    const user = await getCurretnUser();
    if (!user || user.Role !== "admin") {
        return NextResponse.json('Your Plese check Your Are Logged In')
    }
    try {
        const id = params.pId
        const DeletedProduct = await prisma.product.delete({
            where: { id: id }
        })
        console.log(DeletedProduct)
        return NextResponse.json({
            message: 'Product is deleted successfully'
        });
    } catch (error) {
        // Return an error response if any error occurs
        console.log(error, 'eroro in route')
        return NextResponse.error();
    }
};
