import client from "@/libs/prismadb";

export const getUserorder = async (id: string) => {
    try {
        const orders = await client.order.findMany({
            include: { user: true },
            orderBy: {
                createdAt: "desc"
            },
            where: {
                userId: id
            }

        })

        return orders
    } catch (error) {
        console.log('eror')
    }
}