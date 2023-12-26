import React from 'react'
import Morder from '../manage-orders/Manageorders'
import productsData from '@/actions/Getproduct'
import ManageOrders from '../manage-orders/Manageorders'
import { gtOrders } from '@/actions/getOrders'
const Mproducts = async () => {
    // const products = await productsData({ category: null })
    const orders = await gtOrders();
    // console.log(products)
    return (
        <div className=' pt8'>
            <ManageOrders Orders={orders ? orders : null} />
        </div>
    )
}

export default Mproducts