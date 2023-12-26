"use client"
import React, { FC } from 'react'
interface nulDataprops {
    title: string,
}
const Nulldata: FC<nulDataprops> = ({ title }) => {
    return (
        <div className=' w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl'>
            <p className=' font-medium'>{title ? title : "Opps! acces Decline"}</p>
        </div>
    )
}

export default Nulldata