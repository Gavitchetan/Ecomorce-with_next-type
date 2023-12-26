import Image from 'next/image';
import React from 'react';
import Img from './img.jpg';

const Homebaner = () => {
    return (
        <div className='relative bg-gradient-to-r from-sky-500 to-sky-700 flex flex-col md:flex-row rounded-md'>
            <div className='mx-auto px-8 py-12 flex flex-col gap-2 items-center justify-evenly text-center md:text-left'>
                <h1 className='font-bold text-4xl md:text-6xl text-white'>Summer Sale</h1>
                <p className='text-lg md:text-2xl text-slate-200'>Enjoy discounts on selected items</p>
                <p className='text-yellow-500 text-4xl font-bold'>Get 50% OFF</p>
            </div>
            <div className='flex justify-center items-center'>
                <Image src={Img} className='rounded-full w-52 h-52 object-cover' alt='Image' />
            </div>
        </div>
    );
};

export default Homebaner;
