import React, { FC } from 'react'
import { IconType } from 'react-icons'


interface statusProsp {
    text: string,
    Icon: IconType,
    bg: string,
    color: string,
}
const Status: FC<statusProsp> = ({ text, Icon, bg, color }) => {
    return (
        <div className={`${bg} ${color} px-1  flex items-center gap-1 p-1 rounded-md`}>

            {text} <Icon size={15} />
        </div>
    )
}

export default Status