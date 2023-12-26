import React, { FC } from 'react'
import { IconType } from 'react-icons'
interface actionbtnprops {
    Icon: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean
}
const ActionButton: FC<actionbtnprops> = ({ Icon, onClick, disabled }) => {
    return (

        <button disabled={disabled} onClick={onClick} className={`flex items-center justify-center rounded-none cursor-pointer w-[40px] h-[30px] text-slate-700  border border-slate-700  ${disabled && 'opacity-50 cursor-not-allowed'}`}>
            <Icon size={18} />
        </button>
    )
}

export default ActionButton