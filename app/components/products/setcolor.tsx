"use client"
import React from 'react'
import { selectedImg } from '@/app/(site)/product/[pId]/productdetailspage'
import { carProduct } from '@/app/(site)/product/[pId]/productdetailspage'
import Image from 'next/image';
interface setColorProps {
    images: [selectedImg],
    cartProduct: carProduct,
    handleSelect: (value: selectedImg) => void;
}
const SetColor: React.FC<setColorProps> = ({ images, cartProduct, handleSelect }) => {
    console.log(images)
    return (
        <div>
            <div className=" flex  gap-2 items-center ">

                <span className='font-semibold '>color</span>
                <div className=' flex gap-3'>
                    {
                        images.map((imgDta) => (
                            <div key={String(imgDta.image + Math.random())}
                                onClick={() => handleSelect(imgDta)}
                                className={`h-7 w-7 rounded-full 
                            

                                border-teal-300  flex justify-center ${cartProduct.selectedImg.color === imgDta.color ? `border-[1.5px]` : " border-none"}`}>
                                <div style={{ backgroundColor: imgDta.color }} className=' h-5 w-5 rounded-full border-[1.2px] border-slate-300'>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <h4>{cartProduct}</h4> */}
            </div>
        </div >
    )
}

export default SetColor