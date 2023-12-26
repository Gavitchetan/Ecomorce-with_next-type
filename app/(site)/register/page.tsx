import Conteainer from '@/app/components/Conteainer'
import Formwrap from '@/components/global/Formwrap'
import React from 'react'
import RgForm from './RegisterForm'
import { getCurretnUser } from '@/actions/getCurrentUser'

const Register = async () => {
    const user = await getCurretnUser();
    return (
        <Conteainer>
            <Formwrap>
                <RgForm user={user} />
            </Formwrap>
        </Conteainer>
    )
}

export default Register