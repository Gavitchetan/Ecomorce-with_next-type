import React from 'react'
import MOrders from '../manage-orders/page'
import Morder from '../manage-orders/Manageorders'
import productsData from '@/actions/Getproduct'
import MangeProducts from "./ManageProduct"
const Mproducts = async () => {
    const products = await productsData({ category: null })
    // console.log(products)
    return (
        <div className=' pt8'>
            <MangeProducts product={products ? products : null} />
        </div>
    )
}

export default Mproducts