"use client"

import React from 'react'
import Link from 'next/link'
import Conteainer from '@/app/components/Conteainer'

import { usecart } from '@/hooks/usecart'
import { MdArrowBack } from 'react-icons/md'
import Headings from '@/app/components/products/Headings'
import Button from '@/app/components/products/Button'
import truncateText from '@/utils/truncateText'
import ItemCartContent from '@/app/components/products/ItemCartContent'
import { formatPrice } from '@/utils/formatprice'
import axios from 'axios'
const CartClient = () => {
    const { cartProduct, hadnleAddproductCart, hadleClearcartProducts, cartTotalAmount, cartTotalqty } = usecart();
    console.log(cartProduct, cartProduct)
    const payment_intent_id = ''

    const decresHandler = async () => {
        const datas = await axios.post('/api/v1/create-payment', { items: cartProduct, payment_intent_id: payment_intent_id })
        console.log(datas, 'from backend stripe')
    }
    if (!cartProduct || cartProduct.length <= 0) {
        return (
            <div className=' w-full mx-auto my-auto flex flex-col'  >
                <span>Cart</span>
                <Link href={'/'} className=' text-slate-500 flex text-4xl items-center gap-2 ' ><MdArrowBack /></Link>
            </div>
        )
    }
    return (
        <div className='  p-4 mt-8 gap-4 flex flex-col'>
            <Headings center={true} title={' Your Shopping  Cart '} />
            <div className=' grid grid-cols-5 bg-slate-100 text-xl  font-bold p-8 gap-4 items-center' >
                <div className=' col-span-2 justify-self-start'>Product</div>
                <div className=' justify-self-center'>price</div>
                <div>
                    Qauntity
                </div>
                <div>Total</div>
            </div>
            <div >
                {
                    cartProduct && cartProduct.map((item) => (
                        <ItemCartContent item={item} key={item.id} />
                    ))
                }
            </div>
            <div className=' border-t[1.5px] border-slate-200 flex gap-4 justify-between'>
                <div className='w-[90px]  font-bold  '>
                    <Button label='clear cart' outline small onclick={() => { hadleClearcartProducts }} />
                </div>
                <div className=' text-sm flex flex-col gap-1 justify-self-center'>
                    <div className=' flex justify-between w-full text-base font-semibold'>
                        <span>SubTotal</span>
                        <span>${formatPrice(cartTotalAmount)}</span>
                    </div>
                    <p className=' text-slate-500'>Taxes And shipping Callculate aat CheckOut</p>
                    <Button label='CheckOut' onclick={decresHandler} />
                    <Link href={'/'} className=' text-slate-500 flex items-center gap-2 ' >
                        <MdArrowBack />
                        <span>Contienu Shopping</span>
                    </Link>


                </div>
            </div>
        </div>
    )


}

export default CartClient