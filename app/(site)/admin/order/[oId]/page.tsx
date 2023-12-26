import Dummy from '@/utils/products'

import React from 'react'
interface Iparams {
    pId?: string
}
import { SingleProduct } from "@/actions/getSingleProduct"
import products from '@/utils/dummy.data'
import Conteainer from '@/app/components/Conteainer'
import Ratings from '@/app/components/products/Ratings'
import { toast } from 'react-toastify'
import getSingleOrder from '@/actions/getAorder'
import { GetServerSideProps } from 'next';
import OrderDetails from './orderdetails'

type Product = {
    id: string;
    // Define other properties of your product
};

type Props = {
    product: Product;
};

export const GetServerSideProp: GetServerSideProps<Props> = async (context) => {
    const { oId } = context.params || {}; // Perform a null check here

    if (!oId) {
        return {
            notFound: true, // Handle the case where pId is not available
        };
    }

    const Orders = await getSingleOrder(String(oId))
    console.log(Orders, 'myorders')
    return (
        <div>
            <Conteainer>
                <OrderDetails orders={Orders ? Orders : null} />
                <section className=' flex flex-col mt-20 gap-4 p-6'>
                    <div>Add  Rating</div>
                    {/* <div>List Of Ratings</div> */}
                </section>
                {/* <button onClick={() => toast.success('clicked')}>click tehre</button> */}
            </Conteainer>
        </div>
    )
}

export default GetServerSideProp