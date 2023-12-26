import React from 'react'
import Conteainer from '../Conteainer'
import FooterLs from './FooterLs'
import Link from 'next/link'
import { AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai"
const Footer = () => {
    return (
        <footer className=' bg-slate-700  text-slate-200 text-sm mt1'>
            <Conteainer>
                <div className=' flex flex-col md:flex-row justify-between pt-16 pb-8 gap-6'>
                    <FooterLs>
                        <h3 className=' md:text-3xl text-[20px] font-bold capitalize'>Shop Categoreies</h3>
                        <Link href={'/#'}>Phones</Link>
                        <Link href={'/#'}>DeskTop</Link>
                        <Link href={'/#'}>Laptops</Link>
                        <Link href={'/#'}>Kirana ....</Link>
                        <Link href={'/#'}>Offline Food at Our Restaurunt</Link>
                        <Link href={'/#'}>Clothes</Link>
                    </FooterLs>
                    <FooterLs>
                        <h3 className=' md:text-3xl text-[20px] font-bold capitalize'>Customer Servies</h3>
                        <Link href={'/#'}>Contact Us</Link>
                        <Link href={'/#'}>Shipping Policy</Link>
                        <Link href={'/#'}>Return & Exchanges</Link>
                        <Link href={'/#'}>Watches</Link>
                        <Link href={'/#'}>FAQs</Link>
                    </FooterLs>
                    <FooterLs>
                        <h3 className=' md:text-3xl text-[20px] font-bold capitalize'>About Us</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aperiam voluptates sit inventore, sequi perferendis omnis eum eaque nam, officia exercitationem autem dignissimos illum amet. Reprehenderit voluptas molestiae voluptatem maiores.</p>
                        <p>&copy; {new Date().getFullYear()} E-shop All reseverds </p>
                    </FooterLs>
                    <FooterLs>
                        <h3 className=' md:text-3xl text-[20px] font-bold capitalize'>Follow Us</h3>
                        <div className=' flex gap-3'>
                            <Link className=' text-2xl' href={'https://intagram.com/chetan_12.56'}>
                                <AiFillTwitterSquare />
                            </Link>
                            <Link className=' text-2xl' href={'https://intagram.com/chetan_12.56'}>
                                <AiFillLinkedin />
                            </Link>
                            <Link target=' _blank' className=' text-2xl' href={'https://www.instagram.com/chetan_12.56'}>
                                <AiFillInstagram />
                            </Link>
                        </div>
                    </FooterLs>
                </div>
            </Conteainer>
        </footer>
    )
}

export default Footer