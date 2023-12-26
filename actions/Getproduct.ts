// import prisma from "@/libs/prismadb";
// import { FC } from "react";

// export interface Iproductparams {
//     category?: string | null;
//     serchTerm?: string | null;
// }

// const productsDatas = async (params: Iproductparams) => {
//     try {
//         const { category, serchTerm } = params;
//         let serchString = serchTerm || '';

//         let query: Record<string, string | null> = {};
//         if (category) {
//             query.category = category;
//         }

//         const products = await prisma.product.findMany({
//             where: {
//                 ...query,
//                 OR: [
//                     {
//                         name: {
//                             mode: 'insensitive',
//                             contains: serchString,
//                         },
//                         description: {
//                             mode: 'insensitive',
//                             contains: serchString,
//                         },
//                         category: {
//                             mode: "insensitive",
//                             contains: serchString
//                         }
//                     },
//                 ],
//             },
//             include: {
//                 reviews: {
//                     include: {
//                         User: true, // Change 'user' to 'User'
//                     },
//                     orderBy: {
//                         cretedAt: 'desc',
//                     },
//                 },
//             },
//         });

//         return products; // You may want to return the products or do something with them
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         // You can rethrow the error or handle it as needed
//         // throw new Error('Error fetching products');
//     }
// };

// export default productsDatas;



import prisma from "@/libs/prismadb";
import { Product } from ".prisma/client"; // Adjust the import based on your Prisma model
import { FC } from "react";

export interface Iproductparams {
    category?: string | null;
    serchTerm?: string | null;
}

const productsDatas = async (params: Iproductparams): Promise<Product[]> => {
    try {
        const { category, serchTerm } = params;
        const searchQuery = serchTerm ? serchTerm.toLowerCase() : '';

        const products = await prisma.product.findMany({
            where: {
                category: category ? { contains: category, mode: "insensitive" } : undefined,
                OR: [
                    {
                        name: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                    {
                        category: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            include: {
                reviews: {
                    include: {
                        User: true,
                    },
                    orderBy: {
                        cretedAt: 'desc',
                    },
                },
            },
        });

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products');
    }
};

export default productsDatas;
