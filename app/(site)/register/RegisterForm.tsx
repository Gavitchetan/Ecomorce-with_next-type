"use client"
import Headings from '@/app/components/products/Headings'
import Input from '@/components/inputs/input'
// import { Button } from '@mui/material'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { BsEye, BsGoogle } from 'react-icons/bs'
import Button from '@/app/components/products/Button'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/types/indexforusertsc'
interface RgFormProps {
    user: SafeUser | null
}
const RgForm: FC<RgFormProps> = ({ user }) => {
    const router = useRouter()
    const [isLoading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: "",
            name: ""
        }
    })

    const [viewPassword, setViewpasswrod] = useState<boolean>(false)
    const passwordSow = () => {
        setViewpasswrod(!viewPassword)
        return viewPassword
    }
    // const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const onsubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setLoading(true);
            // Register user
            await axios.post('/api/v1/register', data).then(() => {
                toast.success('Account is Created');
                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false
                }).then((cb) => {
                    if (cb?.ok) {
                        router.push('/cart')
                        router.refresh(
                        )
                        toast.success('"Logged In SuccesFully')
                    }
                    if (cb?.error) {
                        toast.error(cb.error)
                        setLoading(false)
                    }
                    setLoading(false)
                }).catch((e) => {
                    setLoading(false)
                    toast.error(e)
                })
            }).catch((e) => {
                toast.error(e)
            })
        } catch (error) {
            toast.error('internal ServerError')
        }
    };

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
            <Headings title='Sing Up For E-shop' />
            <Button outline label='Sign up with Google' Icon={BsGoogle} onclick={() => { signIn('google') }} />
            <hr className=' bg-slate-300 ' />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                required={true}
                // type=''
                errors={errors} />
            <Input
                id='email'
                type='email'
                label='Email'
                disabled={isLoading}
                register={register}
                required
                errors={errors} />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                required
                Icons={BsEye}
                errors={errors}
            />
            <input type="text" value={`1+${viewPassword}`} />
            <Button onclick={handleSubmit(onsubmit)} label={isLoading ? "Loading" : 'SignIn'} />
            <p className=' font-light pnh '>Already Have an An account ?
                <Link href={'/login'}>   Login</Link>
            </p>
        </Fragment>
    )
}

export default RgForm