import type { Metadata } from 'next'
import './globals.scss'
import NavBar from './components/nav/nav'
import Footer from './components/footer/footer'
import CartProvider from '@/providers/cartprovider'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react'
import { getCurretnUser } from '@/actions/getCurrentUser'
import Authprovider from '@/libs/Authprovider'
import Categorys from './components/nav/Category'

export const metadata: Metadata = {
  title: 'Ecomshoping',
  description: 'for online Shoping',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // console.log('user', currnetuser)
  return (
    <html lang="en">
      <body className=''>

        <ToastContainer />
        <Authprovider>

          <CartProvider>
            <div className=' flex flex-col min-h-screen '>
              <NavBar />
              <Categorys />
              <main className=' flex-grow'>
                {children}
              </ main>
              <Footer />
            </ div>
          </CartProvider>
        </Authprovider>
      </body>
    </html>
  )
}

// ep: 29 itemcartImage
