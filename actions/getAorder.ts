import prisma from "@/libs/prismadb";



const getSingleOrder = async (oId: string) => {
    const order = await prisma.order.findUnique({ where: { id: oId } })
    return order
}


export default getSingleOrder

