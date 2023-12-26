// import React from 'react'
// import Conteainer from '../Conteainer'
// import CartCount from './carCount'
// import Link from 'next/link'
// import { CardContent } from '@mui/material'
// import Usermenu from './Usermenu'
// import { getCurretnUser } from '@/actions/getCurrentUser'
// import Category from './Category'
// import Serch from './Serch'
// const NavBar = async () => {
//     const currnetuser = await getCurretnUser()

//     return (
//         <div className=' sticky  top-0 w-full bg-slate-200 z-30 shadow-sm'>
//             <div className=' py-4 border-b[1px] border-slate-600'>
//                 <Conteainer>
//                     <div className=' flex items-center w-full   md:justify-around  justify-between gap-4 '>
//                         <Link href={'/'} >E-shop</Link>
//                         <div className='  md:block'>
//                             <Serch />
//                         </div>
//                         <div className=' flex items-center gap-8 md:gap-12'>
//                             <CartCount />
//                             <Usermenu currentUser={currnetuser} />
//                         </div>
//                     </div>
//                 </Conteainer>
//                 {/* <Category /> */}
//             </div>
//         </div>
//     )
// }

// export default NavBar


import React from 'react'
import Conteainer from '../Conteainer'
import CartCount from './carCount'
import Link from 'next/link'
import { CardContent } from '@mui/material'
import Usermenu from './Usermenu'
import { getCurretnUser } from '@/actions/getCurrentUser'
import Category from './Category'
import Serch from './Serch'

const NavBar = async () => {
    const currnetuser = await getCurretnUser()

    return (
        <div className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
            <div className='py-4 border-b[1px] border-slate-600'>
                <Conteainer>
                    <div className='flex flex-wrap items-center justify-between gap-4 md:justify-around'>
                        <div className='md:flex-grow flex gap-4 items-center'> {/* Allow the search bar to take the available space on small screens */}
                            <Link href={'/'}>E-shop</Link>
                            <Serch />
                        </div>
                        <div className='flex items-center gap-8 md:gap-12'>
                            <CartCount />
                            <Usermenu currentUser={currnetuser} />
                        </div>
                    </div>
                </Conteainer>
                {/* <Category /> */}
            </div>
        </div>
    )
}

export default NavBar;
