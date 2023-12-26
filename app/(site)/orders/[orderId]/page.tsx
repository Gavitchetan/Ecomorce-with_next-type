import React from 'react'
import Order from './Order'
import Conteainer from '@/app/components/Conteainer'
import { getCurretnUser } from '@/actions/getCurrentUser'
import { getUserorder } from '@/actions/getOrderbyuserid'
const UserOrder = async () => {
    const currentUser = await getCurretnUser()
    const orders = await getUserorder(String(currentUser?.id))
    console.log(orders,'orders')
    if (!currentUser) {
        return 'Hello'
    }
    return (
        <div>
            <Conteainer>
                <Order order={orders ? orders : null} />
                <div className=""></div>
            </Conteainer>
        </div>
    )
}

export default UserOrder