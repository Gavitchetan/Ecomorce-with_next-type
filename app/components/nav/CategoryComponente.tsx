'use client'
import { Icon } from '@mui/material'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { FC, useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'
import queryString from 'query-string'
import { url } from 'inspector'
interface categoryProps {

    title: string,
    icon?: IconType,
    selected?: boolean
}
const CategoryComponente: FC<categoryProps> = ({ title, icon, selected }) => {
    const router = useRouter()


    const params = useSearchParams();
    const handleClick = useCallback(() => {
        if (title == "All") {

            router.push('/')
        }
        else {
            let currentUQuery = {};
            if (params) {
                currentUQuery = queryString.parse(params.toString())
            }
            const updatedQuery: any = {
                ...currentUQuery,
                category: title
            }

            const url = queryString.stringifyUrl({
                url: '/',
                query: updatedQuery
            }, { skipNull: true })

            router.push(url)
        }

    }, [title, params, router])
    return (
        <div onClick={handleClick} className={`flex items-center justify-center gap-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${selected ? ` border-slate-800 text-slate-800` : 'border-transparent text-slate-500'}`}>
            <Icon />
            <div className=" font-medium text-sm">{title}</div>
        </div>
    )
}

export default CategoryComponente