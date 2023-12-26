"use client";
import { carProduct, selectedImg } from '@/app/(site)/product/[pId]/productdetailspage';
import Image from 'next/image';
import React from 'react';

interface ProductImgaeProps {
    cartProducts: carProduct,
    product: any,
    hadleColorSelect: (value: selectedImg) => void
}

export const ImageColorTypes: React.FC<ProductImgaeProps> = ({ cartProducts, product, hadleColorSelect }) => {
    console.log(cartProducts.selectedImg.image, 'selectedimg')
    return (
        <div className='grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[400px]'>
            <div className='flex flex-col justify-center gap-4 h-full border cursor-pointer max-h-[500px] min-h-[400px]'>
                {product.images.map((image: selectedImg) => (
                    <div
                        key={`${image.image}-${image.color}`} // Use a combination of image and color for uniqueness
                        className={`relative w-[80%] aspect-square rounded-none border-teal-300 ${cartProducts.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'}`}
                        onClick={() => hadleColorSelect(image)}
                    >
                        <Image height={400} width={400} src={image.image} alt={image.color} />
                        {/* {image.image} */}
                    </div>
                ))}
            </div>
            <div className='col-span-5 relative aspect-square'>
                {/* console.log(product) */}
                {cartProducts.selectedImg && (
                    <img
                        width={70}
                        height={80}
                        key={cartProducts.selectedImg.image} // Use a unique identifier for the key
                        src={cartProducts.selectedImg.image}
                        alt=''
                        className='w-full h-full object-contain max-h-[500px] min-h-[400px] sm:min-h-[400px]'
                    />
                )}
                {cartProducts.selectedImg.image}
            </div>
        </div>
    );
};

export default ImageColorTypes;