
"use client";
import { usecart } from '@/hooks/usecart';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CiShoppingCart } from 'react-icons/ci';

const useCarCount = () => {
    const router = useRouter();
    const { cartTotalqty, cartTotalAmount } = usecart();

    return (
        <div className='hidden md:block relative cursor-pointer' onClick={() => router.push('/cart')}>
            <div className='text-3xl'>
                <CiShoppingCart />
            </div>
            <span className='h-6 text-xs w-6 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px] bg-slate-700 text-white'>{cartTotalqty}</span>
        </div>
    );
};

export default useCarCount;
