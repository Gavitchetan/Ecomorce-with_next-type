'use client'
import React, { useState } from 'react'
import Summery from './Summery'
import GetProducts from "@/actions/Getproduct"
import { getUserorder } from '@/actions/getOrderbyuserid'
import { gtOrders } from '@/actions/getOrders'
import getUsers from '@/actions/getuser'
import Conteainer from '@/app/components/Conteainer'

type Summerydata = {
    [key: string]: { lable: string, digit: string },

}
const Admin = async () => {
    const products = await GetProducts({})
    const orders = await gtOrders()
    const users = await getUsers()
    const [SummeryData, setSummerydata] = useState<Summerydata>()
    return (
        <div className=' pt-8'>
            <Conteainer>
                <Summery products={products} orders={orders ? orders : null} users={users} />
            </Conteainer>
        </div>
    )
}

export default Admin