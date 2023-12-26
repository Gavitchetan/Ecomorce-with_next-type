import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import prisma from "@/libs/prismadb"
import { getSession } from "next-auth/react"
export const getsesion = async () => {
    return await getServerSession(authOptions)
}



export const getCurretnUser = async () => {
    try {
        const session = await getsesion();
        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique(
            {
                where: {
                    email: session.user.email
                },
                include: {
                    Orders: true
                }
            });
        if (!currentUser) {
            return null;
        }


        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toString() : ''
        };

    } catch (error) {
        // Handle errors here
        console.error(error);
        return null;
    }
};
