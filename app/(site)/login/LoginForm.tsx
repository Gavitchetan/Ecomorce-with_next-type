"use client"
import Headings from '@/app/components/products/Headings'
import Input from '@/components/inputs/input'

// import { Button } from '@mui/material'
import React, { FC, Fragment, use, useEffect, useState } from 'react'
import { BsEye, BsGoogle } from 'react-icons/bs'
import Button from '@/app/components/products/Button'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/types/indexforusertsc'
// import { cookies } from "next/headers"
interface loginformprops {
    user: SafeUser | null
}
const LgForm: FC<loginformprops> = ({ user }) => {



    useEffect(() => {



    }, [])

    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: "",
        }

    })

    const [viewPassword, setViewpasswrod] = useState<boolean>(false)
    const passwordSow = () => {
        setViewpasswrod(!viewPassword)
        return viewPassword
    }
    const onsubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((cb) => {
            if (cb?.ok) {
                router.push('/')
                toast.success('Login SUccesFully');
                router.refresh()

            }
        })
    }
    const session = useSession();
    session.data?.user
    console.log('session', session)
    // console
    useEffect(() => {

        if (user) {
            <p>You Have Alredy Logged In You Can acces tHis page</p>
            { router.push('/profile') }
            router.refresh()
        }
    }, [user])

    return (
        <Fragment>
            <Headings title='Login For E-shop' />
            <Button outline label='Login with Google' Icon={BsGoogle} onclick={() => { signIn('google') }} />
            <hr className=' bg-slate-300 ' />

            <Input
                id='email'
                type='email'
                key={'email'}
                label='Email'
                disabled={isLoading}
                register={register}
                required
                errors={errors} />
            <Input
                id='password'
                key={'password'}
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                required
                Icons={BsEye}
                // ={passwordSow}
                errors={errors}
            />
            <input type="text" value={`1+${viewPassword}`} />
            <Button onclick={handleSubmit(onsubmit)} label={isLoading ? "Loading" : 'SignIn'} />
            <p className=' font-light pnh '>New To There ?
                <Link href={'/register'}>   Register</Link>
            </p>
        </Fragment>
    )
}

export default LgForm