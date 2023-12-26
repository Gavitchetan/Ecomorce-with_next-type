// pages/api/checkout.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import razorpay from 'razorpay';

const prisma = new PrismaClient();
interface Intance {
    key_id: string,
    key_secret: string
}
const instance = new razorpay({
    key_id: process.env.RZ_ID as string,
    key_secret: process.env.RZ_SECRET as string,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Use Prisma to interact with the database
            const order = await instance.orders.create({
                amount: Number(req.body.amount * 100),
                currency: 'INR',
            });

            return res.status(200).json({ success: true, order });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
