"use client"
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const Serch = () => {
    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            serchInput: ''
        }
    })
    const router = useRouter();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data.serchInput) {
            return router.push('/')
        }
        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                serchInput: data.serchInput,
            }

        }, { skipNull: true }
        )
        router.push(url)
    }
    return (
        <section className='   w-[50px] focus:w-[200px] flex items-center'>
            <input {...register?.('serchInput')}
                placeholder='Expolore #Eshop' autoComplete='off'
                className=' p-2 border border-gray-300  rounded-l-md focus-within:outline-none focus:border-[0.6px] w-80   focus:border-slate-500 ' type='text' />
            <button onClick={handleSubmit(onSubmit)} className=' bg-slate-700 hover:opacity-80  text-white p-2 rounded-r-md'>Serch</button>
        </section>
    )
}

export default Serch