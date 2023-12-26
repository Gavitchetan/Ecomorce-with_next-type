"use client"
import { carProduct } from '@/app/(site)/product/[pId]/productdetailspage'
import React from 'react'

interface setqtyProps {
    carCounter?: boolean,
    cartproduct: carProduct,
    hadleqtyIncrese: () => void,
    handleQtyDecrese: () => void
}
const btn = 'border-[1.2px] border-slate-300 px-2 rounded'

const Setqauntity: React.FC<setqtyProps> = ({ hadleqtyIncrese, cartproduct, carCounter, handleQtyDecrese }) => {
    return (
        <div className=' flex gap-8 items-center'>
            {
                <>
                    {

                        carCounter ? null : <div className=' font-semibold'>Qauntity</div>
                    }
                    <div className=' flex items-center gap-2 font-bold text-slate-800 md:text-2xl text-sm'>
                        <button className={btn } onClick={handleQtyDecrese}>-</button>
                        <div>{cartproduct.qauntity}</div>
                        <button className={btn} onClick={hadleqtyIncrese}>+</button>

                    </div>
                </>
            }
        </div>
    )
}

export default Setqauntity