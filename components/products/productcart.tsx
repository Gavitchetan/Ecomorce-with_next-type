"use client";
import { formatPrice } from "@/utils/formatprice";
import truncateText from "@/utils/truncateText";
import Image from "next/image";
import React from "react";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

interface ProductCartProducts {
    data: any | null;
}

const ProductCart: React.FC<ProductCartProducts> = ({ data }) => {
    const router = useRouter();

    const transport = () => {
        router.push(`/product/${data.id}`);
    };

    function calculateAverageRating(reviews: any) {
        if (!reviews || reviews.length === 0) {
            return 0; // Return 0 if there are no reviews
        }

        const totalRating = reviews.reduce(
            (sum: any, review: any) => sum + review.rating,
            0
        );
        const averageRating = totalRating / reviews.length;

        return averageRating;
    }

    const rate = calculateAverageRating(data.reviews);

    // Function to convert numerical rating to star symbols
    function convertToStarRating(rating: any) {
        const roundedRating = Math.round(rating);
        const stars = "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
        return stars;
    }

    const getOriginalRating = convertToStarRating(rate);

    return (
        // <div
        //     onClick={transport}
        //     className="col-span-1 cursor-pointer  border-[1.2px] border-slate-300 bg-slate-300 rounded-sm p-2 transition hover:scale-105 text-center text-sm shadow-md hover:shadow-blue-500 delay-150 h-[200px] w-[160px]  sm:h-[300px] sm:w-[250px]"
        // >
        //     {data ? (
        //         <div className="flex h-full  flex-col items-center w-full gap-2">
        //             <section className="aspect-w-16 aspect-h-9 overflow-hidden relative">
        //                 <Image
        //                     className="  shadow-md hover:shadow-black h-full w-full object-contain rounded-md"
        //                     src={data.images[0].image}
        //                     alt={data.name}
        //                     width={150}
        //                     height={100}
        //                 />
        //             </section>
        //             <section className=" w-full h-full">
        //                 <h2 className="text-lg font-bold text-slate-700">
        //                     {truncateText(data.name)}
        //                 </h2>
        //                 <section>Reviews {data.reviews.length}</section>
        //                 <section>
        //                     <p className="font-semibold">{formatPrice(data.price)}</p>
        //                 </section>
        //                 <section className="flex gap-2 text-sm items-center">
        //                     <Rating value={rate} readOnly />
        //                     <p>{rate.toFixed(1)} Rating</p>
        //                 </section>
        //             </section>
        //         </div>
        //     ) : (
        //         "Products are not found"
        //     )}
        // </div>
        <div
            onClick={transport}
            className="col-span-1 cursor-pointer border-[1.2px] border-slate-300 bg-slate-300 rounded-sm p-2 transition hover:scale-105 text-center text-sm shadow-md hover:shadow-blue-500 delay-150 h-[200px] w-[160px] sm:h-[250px]
             sm:w-[200px] md:w-[250px] md:h-[300px] "
        >
            {data ? (
                <div className="flex h-full flex-col items-center w-full gap-2">
                    <section className="aspect-w-16 aspect-h-9 overflow-hidden relative">
                        <Image
                            className="shadow-md hover:shadow-black h-full w-full object-contain rounded-md"
                            src={data.images[0].image}
                            alt={data.name}
                            width={150}
                            height={100}
                        />
                    </section>
                    <section className="w-full h-full">
                        <h2 className="text-md sm:text-lg font-bold text-slate-700">
                            {truncateText(data.name)}
                        </h2>
                        <section>Reviews {data.reviews.length}</section>
                        <section>
                            <p className="font-semibold">{formatPrice(data.price)}</p>
                        </section>
                        <section className="flex  gap-2 text-sm items-center">
                            <Rating value={rate} size={'small'} readOnly />
                            <p>{rate.toFixed(1)} Rating</p>
                        </section>
                    </section>
                </div>
            ) : (
                "Products are not found"
            )}
        </div>
    );
};

export default ProductCart;
