import React from 'react'
import Orders from './Order'
import Conteainer from '@/app/components/Conteainer'
import { getCurretnUser } from '@/actions/getCurrentUser'
import { getUserorder } from '@/actions/getOrderbyuserid'
import { OrderByDirection } from 'firebase/firestore'
const UserOrder = async () => {
    const currentUser = await getCurretnUser()
    const orders = await getUserorder(String(currentUser?.id))
    console.log(orders)
    if (!currentUser) {
        return 'Hello'
    }
    return (
        <div>
            <Conteainer>
                <Orders order={orders ? orders : null} />
                <div className=""></div>
            </Conteainer>
        </div>
    )
}

export default UserOrder