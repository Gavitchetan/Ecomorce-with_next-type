// pages/api/checkout.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import razorpay from 'razorpay';

const instance = new razorpay({
    key_id: process.env.RZ_ID as string,
    key_secret: process.env.RZ_SECRET as string,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const options = {
                amount: Number(req.body.amount * 100),
                currency: 'INR',
            };
            const order = await instance.orders.create(options);
            return res.status(200).json({ success: true, order });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { } = body;
        let cartTotal: number = 0;
        const options = {
            amount: Number(),
            currency: "INR",
        }
        const order = instance.orders.create(options);
        return NextResponse.json({
            order: order,
            
        })
    } catch (error) {

    }
}