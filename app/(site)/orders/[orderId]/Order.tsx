"use client"
import Conteainer from '@/app/components/Conteainer';
import Nulldata from '@/components/Nulldata';
import React, { FC } from 'react'
import { Order } from '@prisma/client'
interface orderprops {
    order: Order[] | null;
}

const Orders: FC<orderprops> = ({ order }) => {
    console.log(order)
    if (order == null) {
        return <Nulldata title='No Orders Found

        ' />
    }
    return (

        <div className=''>

        </div>
    )
}

export default Orders