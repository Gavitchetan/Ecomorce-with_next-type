"use client"
import React, { useState } from 'react';
import Headings from './Headings';
import moment from 'moment';
import { Avatar, Rating } from '@mui/material';

interface ReviewsTypes {
    product: any,
}

const Ratings: React.FC<ReviewsTypes> = ({ product }) => {
    const [expandedReviews, setExpandedReviews] = useState<string[]>([]);

    const toggleExpand = (reviewId: string) => {
        setExpandedReviews((prev) =>
            prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]
        );
    };

    if (!product.reviews || product.reviews.length === 0) {
        return <p>No Reviews</p>;
    }

    return (
        <div>
            <Headings title='Product Reviews' />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                {product.reviews.map((review: any) => (
                    <div key={review.id} className='bg-gray-100 p-4 rounded-md'>
                        <div className='flex items-center gap-3'>
                            <Avatar src={review.User.image} alt={review.User.name} />
                            <div className='flex flex-col'>
                                <span className='text-gray-800 font-semibold'>{review.User.name}</span>
                                <span className='text-gray-500 text-sm'>
                                    {moment(review.createdAt).fromNow()}
                                </span>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <Rating readOnly value={review.rating} />
                            <p className='text-gray-700'>
                                {expandedReviews.includes(review.id)
                                    ? review.comment
                                    : `${review.comment.slice(0, 200)} ${review.comment.length > 200 ? '...' : ''
                                    }`}
                            </p>
                            {review.comment.length > 50 && (
                                <button
                                    className='text-blue-500 hover:underline cursor-pointer'
                                    onClick={() => toggleExpand(review.id)}
                                >
                                    {expandedReviews.includes(review.id) ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ratings;
