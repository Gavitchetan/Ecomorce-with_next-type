"use client"
import { Icon } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React, { FC } from 'react'
import { IconType } from 'react-icons'
interface adminNavProps {
    Icon: IconType,
    label: string,
    selected: boolean,
}
const AdminNavdetails: FC<adminNavProps> = ({ Icon, label, selected }) => {
    return (

        <>
            <div className={` flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 ${selected ? " border-b-slate-800 text-slate-800" : " border-transparent text-slate-500"} `}>
                <Icon />
                <div className=" font-medium text-sm text-clip break-normal">
                    <label htmlFor={label}>{label}</label>

                </div>
            </div>

        </>
    )
}

export default AdminNavdetails