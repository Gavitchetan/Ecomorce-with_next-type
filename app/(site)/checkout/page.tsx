import React from 'react'
import PaymentCheckOut from './checkOutcli'
import Conteainer from '@/app/components/Conteainer'
import Formwrap from '@/components/global/Formwrap'

const page = () => {
    return (
        <div className=' p-8'>
            <Conteainer>
                <Formwrap>
                    <PaymentCheckOut />
                </Formwrap>
            </Conteainer>
        </div>
    )
}

export default page