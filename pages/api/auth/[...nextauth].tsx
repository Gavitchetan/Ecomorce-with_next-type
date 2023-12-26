import NextAuth, { AuthOptions } from "next-auth"
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb"
// const prisma = new PrismaClient()
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text"
                },
                password: {
                    label: "password",
                    type: "password"
                },
            },
            async authorize(credentials) {
                console.log(credentials, 'credentials')
                if (!credentials?.email || !credentials) {
                    throw new Error('Invalid Email And Passwords')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user) {
                    throw new Error('USser not found')
                }
                const matchPassword = await bcrypt.compare(credentials.password, user?.hashedPassword ? user.hashedPassword : "")

                if (!matchPassword) {
                    throw new Error('Password Doesnt Match')
                }
                return user

            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",

    },
    secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)
// export

export { NextAuth as GET, NextAuth as POST }

// import NextAuth from "next-auth";
// // import GoogleProvider from "next-auth/providers/google"
// import GoogleProvider from "next-auth/providers/google"

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//             clientId: process.env.GOOGLE_CLIENT_ID as string

//         }),
//     ]
// })

// export { handler as GET, handler as POST }