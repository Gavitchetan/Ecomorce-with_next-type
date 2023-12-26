"use client"
import Conteainer from '@/app/components/Conteainer';
// fa``
import { AiFillAccountBook } from "react-icons/ai"
import { BsCart } from "react-icons/bs"
import Button from '@/app/components/products/Button';
import Setqauntity from '@/app/components/products/Setqauntity';
import SetColor from '@/app/components/products/setcolor';
import { Rating } from '@mui/material';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import { MdCheckCircle } from "react-icons/md"
import ImageColorTypes from '@/app/components/products/ProductImagescolor';
import { usecart } from '@/hooks/usecart';
import { useRouter } from 'next/navigation';
import Nulldata from '@/components/Nulldata';
interface Iparams {
    product: any
}
const keys = String(Math.random() * Math.random() + 12)

const Horizontal = () => (
    <hr className=' w-[32%] my-21' />
)

// types of 
export type carProduct = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: selectedImg,
    qauntity: number,
    price: number
}

export type selectedImg = {
    color: string,
    colorcode: string,
    image: string
}
// components 
export const ProductDetails: React.FC<Iparams> = ({ product }) => {
    // const { pId } = params;
    console.log(product, 'products')
    console.log(product, 'client page')
    const router = useRouter();


    if (!product) {
        return <Nulldata title='Product is not found' />
    }
    const [cartProducts, setCartProduct] = useState<carProduct>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: product.images[0]
        , qauntity: 1,
        price: product.price
    })
    const { cartTotalqty, hadnleAddproductCart, cartProduct } = usecart();
    const [isproductcart, setisproductincart] = useState<boolean>(false)

    const cartdata = cartProduct;
    useEffect(() => {
        console.log(cartdata, 'cartdata')
        if (cartProduct) {
            const exisingIndex = cartProduct.findIndex((item) => item.id === product.id);
            if (exisingIndex > -1) {
                setisproductincart(true)
            }
        }
    }, [cartdata])

    // console.log(cartProduct,'cartproduct')
    // console.log(cartTotalqty)
    const hacolorSelect = useCallback(
        (value: selectedImg,) => {
            // console.log(value)
            setCartProduct((prev) => {
                return { ...prev, selectedImg: value }
            })
            // console.log(cartProducts)
        },
        [cartProducts.selectedImg]
    )

    const HandleIncres = useCallback(
        () => {

            setCartProduct((prev) => {
                return { ...prev, qauntity: prev.qauntity++ }
            })
        },
        [cartProducts],
    )

    const HandleDecrese = useCallback(
        () => {
            if (cartProducts.qauntity == 1) {
                return alert('product qautity must be one ')
            }
            setCartProduct((prev) => {

                return { ...prev, qauntity: prev.qauntity-- }
            })
        },
        [cartProducts],
    )
    // const producrRevies = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length
    return (
        <div className='   grid grid-cols-1 md:grid-cols-2 gap-12  p-8' >
            <div className="">
                <div>
                    <ImageColorTypes key={String(Math.random() + 1221212)} product={product} hadleColorSelect={hacolorSelect} cartProducts={cartProducts} />
                </div>
            </div>
            {/* ??? */}

            <div className="  gap-4 flex flex-col  accent-lime-50" >
                <h2 className=' font-semibold pnh text-slate-500 text-2xl'>Name : {product.name}</h2>
                {/* <div className=' flex justify-start gap-6'>
                    <Rating value={producrRevies} readOnly />
                    <div>
                        <p>{product.reviews.length} reviews</p>

                    </div>
                </div> */}
                <Horizontal />
                <div>
                    {product.descripion}
                </div>
                <div>
                    <span className=' font-bold text-slate-500'>Category : </span>
                    <span>{product.category}</span>
                </div>
                <div>
                    <span className=' font-bold text-slate-500'>Brand : </span>
                    <span>{product.brand}</span>
                </div>
                <div className={product.inStock ? " text-teal-400" : "text-red-600"}>
                    {product.inStock ? 'In Stock' : "Out of Stock"}
                </div>
                <Horizontal />

                <div>
                    <SetColor key={product.id} cartProduct={cartProducts} images={product.images} handleSelect={hacolorSelect} />
                </div>

                <Horizontal />
                <div>qty</div>
                <Horizontal />
                <div className="">cart</div>
                <p>
                    {
                        cartProducts.selectedImg.color
                    }
                </p>
                <Setqauntity key={Math.random() / 2} cartproduct={cartProducts} carCounter={product} hadleqtyIncrese={HandleIncres} handleQtyDecrese={HandleDecrese} />

                <Horizontal />
                <div className=" max-w-[300px]">
                    {
                        isproductcart ? (
                            <>
                                <p className=' mb-2 text-slate-500 flex items-center gap-2 border-[1px] p-4 shadow-sm shadow-black border-slate-300 '>
                                    <MdCheckCircle className={'  text-teal-500 text-[20px]'} />
                                    <span className=' text-[15px]'>Product is added to cart`</span>
                                </p>
                                <Button onclick={() => router.push('/cart')} label='Cart' />
                            </>
                        ) : <Button key={Math.random()} label={'add to cart'} custom='not' outline={false} small={false} disabled={false} Icon={BsCart} onclick={() => hadnleAddproductCart(cartProducts)} />
                    }
                </div>

            </div >
            {/* ???  */}
        </div >
    )
}

export default ProductDetails




