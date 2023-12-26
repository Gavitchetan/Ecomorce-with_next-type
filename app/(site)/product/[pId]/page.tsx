import Dummy from '@/utils/products'

import React from 'react'
interface Iparams {
    pId?: string
}
import { SingleProduct } from "@/actions/getSingleProduct"
import products from '@/utils/dummy.data'
import ProductDetails from './productdetailspage'
import Conteainer from '@/app/components/Conteainer'
import Ratings from '@/app/components/products/Ratings'
import { toast } from 'react-toastify'

import { GetServerSideProps } from 'next';
import AddRating from './AddRating'
import { getServerSideProps } from 'next/dist/build/templates/pages'
import { getCurretnUser } from '@/actions/getCurrentUser'

type Product = {
    id: string;
    // Define other properties of your product
};

type Props = {
    product: Product;
};

export const GetServerSideProp: GetServerSideProps<Props> = async (context) => {
    const { pId } = context.params || {}; // Perform a null check here

    if (!pId) {
        return {
            notFound: true, // Handle the case where pId is not available
        };
    }
    // console.log(MyProduct)
    const CurrentUser = await getCurretnUser();
    const MyProduct = await SingleProduct(String(pId))
    return (
        <div>
            <Conteainer>
                <ProductDetails product={MyProduct} />
                <section className=' flex flex-col mt-20 gap-4 p-6'>
                    <div>
                        <AddRating product={MyProduct ? MyProduct : null} user={CurrentUser ? CurrentUser : null} />
                    </div>
                    {/* <div>List Of Ratings</div> */}
                    <Ratings key={MyProduct?.id} product={MyProduct} />
                </section>
                {/* <button onClick={() => toast.success('clicked')}>click tehre</button> */}
            </Conteainer>
        </div>
    )
}
export default GetServerSideProp



