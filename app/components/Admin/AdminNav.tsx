"use client"
import React from 'react'
import adminOptions from '@/utils/adminNAV'
import Link from 'next/link'
import AdminNavdetails from './AdminNavdetails'
import Conteainer from '../Conteainer'
import { MdDashboard, MdLibraryAdd, MdManageHistory, MdScale } from 'react-icons/md'
import { usePathname } from 'next/navigation'
const AdminNav = () => {
    const paths = usePathname()
    console.log(paths, 'ptha')
    return (
        <div className=' pt-4 b-[1px]    shadow-sm w-full top-20 gap-4'>
            <Conteainer >
                <div className=" flex flex-row items-center justify-between md:justify-center gap-8 md:gap-4 overflow-x-auto  flex-nowrap">

                    <Link href={'/admin'}>
                        <AdminNavdetails label='Dashboard' Icon={MdDashboard} selected={paths === '/admin'} />
                    </Link>

                    <Link href={'/admin/manage-orders'}>
                        <AdminNavdetails label='Mange Orders' Icon={MdManageHistory} selected={paths === '/admin/manage-orders'} />
                    </Link>

                    <Link href={'/admin/add-products'}>
                        <AdminNavdetails label='Add Product' Icon={MdLibraryAdd} selected={paths === '/admin/add-products'} />
                    </Link>

                    <Link href={'/admin/manage-products'}>
                        <AdminNavdetails label='Manage Porducts' Icon={MdLibraryAdd} selected={paths === '/admin/manage-products'} />
                    </Link>

                    <Link href={'Sells'}>
                        <AdminNavdetails label='Dashboard' Icon={MdScale} selected={paths === 'admin'} />
                    </Link>

                </div>
            </Conteainer>
        </div>
    )
}

export default AdminNav