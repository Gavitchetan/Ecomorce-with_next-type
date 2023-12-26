"use client"
import { Avatar, MenuItem } from '@mui/material'
import Link from 'next/link'
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import MenuItems from './MenuIcons'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BackDrops from './BackDrops'
import { User } from '@prisma/client'
import { SafeUser as safeUser } from '@/types/indexforusertsc'
interface userMenuProps {
    currentUser: safeUser | null
}
const Usermenu: FC<userMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter()
    // const { data: session } = useSession();

    const toggleOpen = useCallback(
        // const router = useRouter()
        () => {
            setIsOpen((prev) => !prev)
        },
        [],
    )
    useEffect(() => {
        toggleOpen()
    }, [toggleOpen])

    return (
        // <div>Usermenu</div>
        <Fragment>
            <div onClick={toggleOpen} className=' relative '>
                <div className=" border-[1px]
              flex-row
             border-slate-400
              flex items-center 
              w-full
              bg-zinc-300
               gap-1 rounded-full
                cursor-pointer 
                hover:shadow-md
                 transition
              text-slate-700
                              ">
                    <Avatar />
                    <AiFillCaretDown />
                </div>
                {
                    isOpen && (
                        <div className=" z-50 absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 flex-col flex cursor-pointer">
                            {/* <h2>{session?.user?.name}</h2> */}
                            {
                                currentUser !== null ? <div className="">
                                    <Link href={'/orders'}>
                                        <MenuItems onClick={() => { }} >
                                            Your Orders
                                        </MenuItems>
                                    </Link>

                                    <Link href={'/orders'}>
                                        <MenuItems onClick={() => { }} >
                                            Cart
                                        </MenuItems>
                                    </Link>
                                    {
                                        currentUser && currentUser.Role == "admin" && (
                                            <Link href={'/admin'}>
                                                <MenuItems onClick={() => { }} >
                                                    Admin Routes
                                                </MenuItems>
                                            </Link>
                                        )
                                    }
                                    <MenuItems onClick={signOut}>Logout</MenuItems>
                                </div> : <div>
                                    <Link href={'/login'}>
                                        <MenuItems onClick={toggleOpen} >
                                            Login
                                        </MenuItems>
                                    </Link>
                                    <Link href={'/register'}>
                                        <MenuItems onClick={toggleOpen} >
                                            Register
                                        </MenuItems>
                                    </Link>
                                </div>
                            }
                        </div>
                    )
                }
            </div>
            {
                isOpen ? <BackDrops onclick={toggleOpen} /> : null
            }
        </Fragment>
    )
}

export default Usermenu