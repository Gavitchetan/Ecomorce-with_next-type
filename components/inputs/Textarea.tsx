"use client"
import React, { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
interface textProps {
    label: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled: boolean,
    id: string,
    required: boolean,
    defaultValue?: string;

}
const Textarea: FC<textProps> = ({ label, register, errors, disabled, id, required }) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <textarea
                {...register(id, { required })}
                disabled={disabled}
                id='id'
                placeholder='
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi quo delectus modi fugit, quasi dolor excepturi ipsum autem labore deserunt eos reprehenderit deleniti error perferendis impedit quidem nam vero obcaecati!'

                className={`w-full p-4 pt-6 text-sm max-h-[150px] min-h-[150px] text-slate-700 outline-none bottom-2 border border-slate-300 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id]
                    ? 'border-b-2 border-rose-400 focus:border-rose-400'
                    : 'focus:border-slate-300'
                    } ${errors[id] ? 'text-rose-400' : 'text-slate-400'
                    } placeholder-slate-400`}
            />
        </div>
    )
}

export default Textarea