import React from 'react'
import Geproducts from "@/actions/Getproduct"
export const revalidate = 0
import MyPage from './components/home'
import { GetServerSideProps } from 'next';
import getproducts from "@/actions/Getproduct"
import ProductCart from '@/components/products/productcart';
import Conteainer from './components/Conteainer';
import Homebaner from './components/Homebaner';
import Image from 'next/image';
import Nulldata from '@/components/Nulldata';
export const GetServerSideProp: GetServerSideProps = async (context) => {

  let products: any | null = await getproducts({})

  if (!products) return <Nulldata title='Products not fouhnd' />
  const { category, serchInput } = context.searchParams; // Perform a null check here
  if (category) {
    products = null
    products = await getproducts({ category })
  }
  const serchTerm = serchInput;
  if (serchInput) {
    products = null
    products = await getproducts({ serchTerm })
  }
  function shuffleArray(array: any[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  // console.log(products)
  const filterProduct = shuffleArray(products)

  // if (!category) {
  //   return {
  //     notFound: true, // Handle the case where pId is not available
  //   };
  // }

  return (
    <div className='p-8'>
      <Conteainer>
        <div>
          <Homebaner />
        </div>
        <div className=' grid  grid-cols-2  sm:grid-cols-3  sm:gap-4  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4  2xl:grid-cols-6 mt-12'>
          {
            products ? filterProduct.map((value: any, index: any) => (
              <ProductCart data={value} key={index} />
            )) : <Nulldata title='products Not found' />
          }
        </div>
        {/* <Image src={'https://m.media-amazon.com/images/I/617yPJ1t9AL._SX522_.jpg'} alt='fucking as all' width={50} height={50} /> */}
      </Conteainer >
    </div >
  )
}

export default GetServerSideProp

