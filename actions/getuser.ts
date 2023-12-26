import prisma from "@/libs/prismadb";



const getUsers = async () => {
    const users = await prisma.user.findMany({});
    return users
}
// { include: { Orders: true, Review: true },
export default getUsers