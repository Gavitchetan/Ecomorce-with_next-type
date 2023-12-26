import Stripe from 'stripe';
import { CartProducts, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getCurretnUser } from '@/actions/getCurrentUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
});

const Prisma = new PrismaClient();

function calculateTotalPrice(items: CartProducts[]) {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.qauntity;
        return acc + itemTotal;
    }, 0);
    // const totol = totalPrice.toFixed(2);
    return totalPrice
}

export const PUT = async (request: Request) => {
    try {
        const curuser = await getCurretnUser();

        if (!curuser) {
            return NextResponse.json(
                {
                    unAuthorize: 'user is unauthorized',
                    success: false,
                },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { items, payment_intent_id } = body;
        const total = calculateTotalPrice(items) * 100;

        const orderData = {
            user: { connect: { id: curuser.id } },
            amount: total,
            currency: 'INR',
            deliveryStatus: 'Pending',
            paymentIntentId: payment_intent_id,
            state: 'someState',
            products: items,
            status: 'pending',
        };

        if (payment_intent_id) {
            const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
            console.log("status", currentIntent.status, 'payment intents');
            console.log(currentIntent, 'curentintent')

            if (currentIntent && currentIntent.status === "requires_payment_method") {
                // Payment intent exists and has succeeded, update order
                const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });
                console.log(updatedIntent, payment_intent_id, 'payment intent');

                // Check if there's an existing order
                const existingOrder = await Prisma.order.findUnique({
                    where: { paymentIntentId: payment_intent_id },
                });
                console.log(existingOrder, existingOrder?.id);

                if (existingOrder) {
                    // Update the existing order
                    console.log('order is already exist');
                    const updatedOrder = await Prisma.order.update({
                        where: { id: existingOrder.id },
                        data: { amount: total, products: items },
                    });
                    console.log('product is updating')
                    return NextResponse.json({ paymentIntent: updatedIntent, updatedOrder });
                } else {
                    // Create a new order if there is no existing order
                    // console.log('Order does not exist');
                    // await Prisma.order.create({
                    //     data: orderData,
                    // });

                    // return NextResponse.json({ paymentIntent: updatedIntent });
                }
            } else {
                console.log('Invalid payment intent');
                return NextResponse.json(
                    {
                        error: 'Invalid payment intent or payment intent has not succeeded.',
                    },
                    { status: 400 }
                );
            }
        } else {
            // Create new order
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: 'usd',
                automatic_payment_methods: { enabled: true },
            });

            orderData.paymentIntentId = paymentIntent.id;

            await Prisma.order.create({
                data: orderData,
            });

            return NextResponse.json({ paymentIntent });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: 'Internal Server Error',
            },
            { status: 500 }
        );
    } finally {
        await Prisma.$disconnect();
    }
};
