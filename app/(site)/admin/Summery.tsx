"use client"
import { Order, Product, User } from '@prisma/client'
import React, { FC } from 'react'
interface Summeryprops {
    products: Product[];
    users: User[];
    orders: Order[] | null | any[]
}
const Summery: FC<Summeryprops> = ({ products, users, orders }) => {
    return (
        <div>Summery</div>
    )
}

export default Summery