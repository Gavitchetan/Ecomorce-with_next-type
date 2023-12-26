"use client"
import Conteainer from '@/app/components/Conteainer';
import Nulldata from '@/components/Nulldata';
import { formatPrice } from '@/utils/formatprice';
import { Order } from '@prisma/client';
import moment from 'moment';
import Link from 'next/link';
import React, { FC, Fragment } from 'react';

interface orderprops {
    order: Order[] | null;
}

const Orders: FC<orderprops> = ({ order }) => {
    if (!order || order.length === 0) {
        return <Nulldata title='No Orders Found' />;
    }

    return (
        <div className='mt-12 bg-slate-200 w-full md:w-[1150px] mx-auto'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            <div className="grid grid-cols-4 gap-4 bg-slate-700 text-white py-2 px-4 rounded-t-md">
                <div className=" place-self-start">PRODUCT</div>
                <div className=" place-self-start">PRICE</div>
                <div className=" place-self-center">QTY</div>
                <div className=" place-self-end">Orders </div>
            </div>
            {order.map((item) => (
                <Fragment key={item.id}>
                    <section className=" gap-8 border-b border-slate-700 py-2 px-4">
                        {item.products.map((product) => (
                            <Fragment key={product.id}>
                                <div className=" grid grid-cols-3  gap-2 ">

                                    <div className="  place self-start">{product.name}</div>
                                    <div className="  place self-center">{formatPrice(product.price / 100)}</div>
                                    <div className="  place self-center">{product.qauntity}</div>
                                </div>
                            </Fragment>
                        ))}
                    </section>
                    <div className=" flex items-start justify-between gap-7 py-2 px-4 border-b border-slate-700">
                        <div className="">
                            Order Details
                            <Link className=' ml-3 font-bold  bg-green-500' href={`/orders/${item.id}`}>Order Details</Link>
                        </div>
                        <div className="">OrderAt :  {moment(item.createdAt).fromNow()}</div>
                        Total : {formatPrice(item.amount / 100)}
                    </div>
                </Fragment>
            ))}
        </div>
    );
};

export default Orders;
