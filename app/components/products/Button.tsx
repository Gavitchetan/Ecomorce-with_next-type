import React from 'react'
import { IconType } from 'react-icons';
interface butonsProp {
    label: string,
    disabled?: boolean,
    outline?: boolean;
    small?: boolean
    custom?: string,
    Icon?: IconType,
    onclick: (e: React.MouseEvent<HTMLButtonElement>) => void

}
const Button: React.FC<butonsProp> = ({ label, disabled, onclick, small, custom, outline, Icon }) => {
    return (
        <button disabled={disabled} className={`
        disabled:opacity-70 
        disabled:cursor-not-allowed
        rounded-md hover:opacity-80 transition w-full border-slate-700 
        flex items-center justify-center gap-2

        ${outline ? "bg-white" : "bg-slate-800"}
        ${outline ? "text-slate-700" : "text-white"}
        ${small ? "text-sm font-light" : "text-md  font-semibold"}
        ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
        ${custom ? custom : ""}

        `} onClick={onclick}>
            {
                label && Icon ? (
                    <>
                        <div className=' flex items-center justify-center  gap-4'>
                            <Icon size={16} />
                            <span>{label}</span>
                        </div>
                    </>
                ) : (
                    <>
                        {label}
                        {Icon && <Icon size={24} />}
                    </>
                )
            }

        </button>
    )
}

export default Button