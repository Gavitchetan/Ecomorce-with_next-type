'use client'

import { IconType } from 'react-icons'

interface catProps {
    selected: boolean,
    Icon: IconType,
    label: string,
    onclick: (value: string) => void,



}
import { Icon } from '@mui/material'
import React, { FC } from 'react'

const CateGoryIN: FC<catProps> = ({ selected, Icon, label, onclick }) => {

    return (
        <div onClick={() => { onclick(label) }} className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-400 transition ${selected ? " border-slate-500 text-slate-800" : "  border-slate-200 text-slate-500"} `}>
            <Icon size={27} />
            <div>{label}</div>
        </div>
    )
}

export default CateGoryIN