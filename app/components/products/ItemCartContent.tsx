"use client"
import { carProduct } from '@/app/(site)/product/[pId]/productdetailspage'
import { formatPrice } from '@/utils/formatprice'
import TruncateText from '@/utils/truncateText'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import Setqauntity from './Setqauntity'
interface itemCartProps {
    item: carProduct
}
import SetQTY from './SetQTY'
import { usecart as Usecart, usecart } from '@/hooks/usecart'
const ItemCartContent: React.FC<itemCartProps> = ({ item }) => {

    const { hadleRemoveProduct, handleCartQTYincrement, handleCartQTYdecrement } = usecart()
    return (
        <div className='  grid-cols-5 text-xs md:text-sm gap-5  border-t-[1.px] grid border-slate-200 items-center
        bg-cyan-50'  >
            <div className='  col-span-2 justify-self-start flex gap-2 md:gap-4 m-4 '>
                <Link href={`/product/${item?.id}`} className=' relative w-[70px] aspect-square'>
                    <img width={100} height={100} className=' rounded-sm' src={item?.selectedImg.image} alt="Img not loading" />
                </Link>
                <section className=' flex flex-col justify-between'>
                    <Link className=' font-bold' href={`/product/${item?.id}`}>{TruncateText(String(item?.name))} </Link>
                    <span>{item?.selectedImg.color}</span>
                    <div className=' w-[70px]'>
                        <button className=' underline font-bold text-red-600' onClick={() => hadleRemoveProduct(item)} >
                            Remove
                        </button>
                    </div>
                </section>
            </div>
            <div className=' flex justify-self-center'>{formatPrice(item?.price ? item.price : 0)}</div>
            <div>
                <Setqauntity cartproduct={item} carCounter={true} handleQtyDecrese={() => { handleCartQTYdecrement(item) }}
                    hadleqtyIncrese={() => { handleCartQTYincrement(item) }}
                />
            </div>
            <div>{item?.price * item.qauntity}</div>
        </div >
    )
}

export default ItemCartContent