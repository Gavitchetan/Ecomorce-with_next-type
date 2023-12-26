"use client"
import Headings from '@/app/components/products/Headings';
import { formatPrice } from '@/utils/formatprice';
import { Order } from '@prisma/client';
import moment from 'moment';
import React, { FC } from 'react';

import { FaClock, FaCheck, FaTruck, FaCheckCircle, FaBan } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import OrItems from './OrItems';
interface OrderProps {
    orders: Order | null;
}

const OrderDetails: FC<OrderProps> = ({ orders }) => {
    const getPaymentStatusIcon = () => {
        if (orders?.status === 'pending') {
            return <span className="bg-yellow-400 gap-2 items-center rounded flex p-1">Pending <FaClock /></span>;
        } else if (orders?.status === 'completed') {
            return <span className="bg-green-400 rounded p-1 flex items-center gap-2">Completed <MdDone /></span>;
        } else {
            return <span className="bg-gray-400 rounded p-1">Unknown</span>;
        }
    };

    const getDeliveryStatusIcon = () => {
        if (orders?.deliveryStatus === 'Pending') {
            return <span className="bg-red-400 rounded p-1 flex items-center gap-2">Pending <FaClock /> </span>;
        } else if (orders?.deliveryStatus === 'delivered') {
            return <span className="bg-green-400 rounded p-1 flex items-center gap-2">Delivered <MdDone /> </span>;
        } else {
            return <span className="bg-gray-400 rounded p-1">Unknown</span>;
        }
    };

    const orderdate = orders?.createdAt;
    return (
        <div className="max-w-[1150px] m-auto flex flex-col gap-2">
            <div className=" flex items-center gap-2">
                Total Amount : <p className=' font-bold'> {formatPrice(Number(orders?.amount) / 100)}</p>

            </div>
            <div className=" flex gap-2">
                OrderAt : {moment(orderdate && orderdate).fromNow()}
            </div>
            <div className="flex gap-2">
                <div className="">Payment Status:</div>
                <span className="font-bold">{getPaymentStatusIcon()}</span>
            </div>
            <div className="flex gap-2">
                <div className="">Delivery Status:</div>
                <span className="font-bold">{getDeliveryStatusIcon()}</span>
            </div>
            <div className="">
                {/* <h2 className=' font-semibold mt-4 mb-2'>Products order</h2>
                <div className=" grid grid-cols-5    text-xs gap-2  items-center">
                    <div className=" col-span-2 justify-self-start">Products</div>
                    <div className=" justify-self-cener">NAME</div>
                    <div className=" justify-self-center">PRICE</div>
                    <div className=" justify-self-center font-bold">Total</div>
                    <div className=" justify-self-center">QTY</div>

                </div> */}

                {/* ... other JSX */}
                <h2 className="font-semibold mt-4 mb-2">Products Order</h2>
                <div className="grid grid-cols-5 text-xs gap-2 items-center">
                    <div className=" justify-self-start">Products</div>
                    <div className="justify-self-center">NAME</div>
                    <div className="justify-self-center">PRICE</div>
                    <div className="justify-self-center font-bold">Total</div>
                    <div className="justify-self-center">QTY</div>
                </div>
                {
                    orders?.products && orders.products.map((item, index) => (
                        <OrItems item={item ? item : null} />
                        // <div className=""></div>
                    ))
                }

            </div>
        </div>
    );

};

export default OrderDetails;


// id: string;
// name: string;
// description: string;
// category: string;
// brand: string;
// qauntity: number;
// price: number;
// } & {
//     : {
//         color: string;
//         colorCode: string;
//         image: string;

