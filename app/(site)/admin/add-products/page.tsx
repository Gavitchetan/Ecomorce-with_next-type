import React from 'react'
import ProductForm from './Addproudctform'
import Conteainer from '@/app/components/Conteainer'
import { getCurretnUser } from '@/actions/getCurrentUser'
import Nulldata from '@/components/Nulldata'

const page = async () => {
    const user = await getCurretnUser();
    if (!user || user?.Role !== "admin") {
        return <Nulldata title='Opps! Acces Decline' />
        console.log('Your Not allowed');

    }
    return (
        <div className=' p-8'>
            <Conteainer>
                <ProductForm />
            </Conteainer>
        </div>
    )
}

export default page