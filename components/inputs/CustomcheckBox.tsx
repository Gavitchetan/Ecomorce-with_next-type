'use client'
import React, { FC } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
interface cheCProps {
    label: string,
    id: string,
    disabled: boolean,
    register: UseFormRegister<FieldValues>,
    // errors:
}
const CustomcheckBox: FC<cheCProps> = ({ label, id, disabled, register }) => {
    return (
        <div className='  w-[100px]   flex flex-row items-start
        
  
        '>
            <input
                {...register?.(id)}
                type='checkbox'
                disabled={disabled}
                className={`w-full p-4 cursor-pointer pt-6 text-sm text-slate-700 outline-none bottom-2 border border-slate-300 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed`}
            />
            <label className=' font-medium cursor-pointer' htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomcheckBox