import React from 'react'
import Conteainer from '../Conteainer'
import CartCount from './carCount'
import Link from 'next/link'
import { CardContent } from '@mui/material'
import Usermenu from './Usermenu'
import { getCurretnUser } from '@/actions/getCurrentUser'
const NavBar = async () => {
    const currnetuser = await getCurretnUser()

    return (
        <div className=' sticky overscroll-scroll  top-0 w-full bg-slate-200 z-30 shadow-sm'>
            <div className=' py-4 border-b[1px] border-slate-600'>
                <Conteainer>
                    <div className=' flex items-center justify-between gap-3 md:gap-0'>
                        <Link href={'/'} >E-shop</Link>
                        <div className=' hidden md:block'>Serch</div>
                        <div className=' flex items-center gap-8 md:gap-12'>
                            <CartCount />
                            <Usermenu currentUser={currnetuser} />
                        </div>
                    </div>
                </Conteainer>
            </div>
        </div>
    )
}

export default NavBar