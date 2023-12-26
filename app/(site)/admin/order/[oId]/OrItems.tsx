"use client"
import { formatPrice } from '@/utils/formatprice'
import TruncateText from '@/utils/truncateText'
import { CartProducts, Product } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
interface OrderItemprops {
    item: any | null
}

const OrItems: FC<OrderItemprops> = ({ item }) => {
    const router = useRouter();
    if (item == null) {
        return 'not found'
    }
    console.log(item, 'items')
    return (
        <div className=' border-slate-200 grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px]  items-center py-4'>
            <div className=" col-span-2 justify-self-start flex gap-2 items-center py-4">
                <div className=" relative w-[70px]  justify-self-start  aspect-square gap-2">
                    <Image className='' fill src={item.selectedImg.image} alt={item.selectedImg.color} />
                </div >
            </div>
            <div className="  flex flex-col gap-2  ">{TruncateText(item.name)} {item.selectedImg.color}</div>
            <div className=" flex justify-self-center">{formatPrice(item.price)}</div>
            <div className=" font-semibold  justify-self-end">{(item.qauntity)}</div>
        </div>
    )
}

export default OrItems