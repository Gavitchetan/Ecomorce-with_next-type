"use client"


import Button from '@/app/components/products/Button';
import Headings from '@/app/components/products/Headings';
import Textarea from '@/components/inputs/Textarea';
import Input from '@/components/inputs/input';
import { SafeUser } from '@/types/indexforusertsc';
import { Rating } from '@mui/material';
import { Order, Product, Review, } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// interface adprosp {
//     product: Product & {
//         reviews: Review[];
//     } | null;
//     user: SafeUser & {
//         Orders: Order[] | null;
//     } | null;
// }
// // ... (your other imports)

interface AddRatingProps {
    product: Product & {
        reviews: Review[];
    } | null;
    user: SafeUser & {
        Orders: Order[] | null;
    } | null;
}

const AddRating: FC<AddRatingProps> = ({ product, user }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const isDeliveryOrderStatusExist = user?.Orders?.some(
        (order) =>
            order.products.find((item) => item.id === product?.id) &&
            order.deliveryStatus === "delivered"
    );

    const userReview = product?.reviews.find(
        (review: Review) => review.userId === user?.id
    );
    // console.log(userReview, 'userrevies')
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            comment: userReview?.comment || '',
            rating: userReview?.rating || 0,
        },
    });

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const rate = watch('rating');
    const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
        if (data.rating === 0) {
            return toast.error("You can't select 0 stars. Please select 1 to 5 stars.");
        }

        // return 
        if (userReview) {

            const ratingData = { ...data, reviewId: userReview?.id, };
            const updateReview = await axios
                .put(`/api/v1/rating`, ratingData)
                .then((data) => {
                    console.log('Review is updated successfully', data);
                    toast.success('Review is Updated');
                    router.refresh();
                    reset();
                })
                .catch((e) => {
                    toast.error('Something Went Wrong');
                })
                .finally(() => {
                    setLoading(false);
                });


        } else {
            const ratingData = { ...data, product: product };
            const createReview = await axios
                .post('/api/v1/rating', ratingData)
                .then((data) => {
                    console.log('Review is added successfully', data);
                    toast.success('Review is Submitted');
                    router.refresh();
                    reset();
                })
                .catch((e) => {
                    toast.error('Something Went Wrong');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <div className='flex flex-col gap-2 max-w-[500px]'>
            <Headings title='Add Reviews Here' />

            <p className='my-4 text-xs'>Please double click to select stars</p>
            {isDeliveryOrderStatusExist && userReview ? (
                <div>
                    <Headings title='Edit Your Review' />
                    <Rating
                        value={rate}
                        onChange={(event, newValue) => {
                            setCustomValue('rating', newValue);
                        }}
                    />
                    <Textarea
                        errors={errors}
                        label='Comment'
                        id='comment'
                        required
                        disabled={isLoading}
                        register={register}
                        defaultValue={userReview.comment} // Display previous comment
                    />
                    <p className='text-gray-500 text-sm mb-4'>
                        Previous Rating: {userReview.rating} {/* Display previous rating */}
                    </p>
                    <Button onclick={handleSubmit(onSubmit)} label={isLoading ? 'Loading...' : 'Update Review'} />
                </div>
            ) : (
                <>
                    <Rating
                        value={rate}
                        onChange={(event, newValue) => {
                            setCustomValue('rating', newValue);
                        }}
                    />
                    <Textarea
                        errors={errors}
                        label='Comment'
                        id='comment'
                        required
                        disabled={isLoading}
                        register={register}
                    />
                    <Button onclick={handleSubmit(onSubmit)} label={isLoading ? 'Loading...' : 'Add Review'} />
                </>
            )}
        </div>
    );
};

export default AddRating;