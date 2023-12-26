import Conteainer from '@/app/components/Conteainer'
import Formwrap from '@/components/global/Formwrap'
import React from 'react'
import LoginForm from './LoginForm'
import { getCurretnUser } from '@/actions/getCurrentUser'

const page = async () => {
    const user = await getCurretnUser()
    return (
        <Conteainer>
            <Formwrap>
                <LoginForm user={user} />
            </Formwrap>
        </Conteainer>
    )
}

export default page