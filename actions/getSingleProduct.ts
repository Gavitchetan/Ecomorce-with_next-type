import Prisma from "@/libs/prismadb";


export const SingleProduct = async (pId: string) => {
    try {
        console.log(pId, 'pid')
        const product = await Prisma.product.findUnique(
            {
                where: {
                    id: pId
                },
                include: {
                    reviews: {
                        include: {
                            User: true
                        },
                        orderBy: {
                            cretedAt: 'desc'
                        }
                    }
                }

            }
        )
        return product


    } catch (error) {
        return console.log('Eror To Find product')
    }
}
