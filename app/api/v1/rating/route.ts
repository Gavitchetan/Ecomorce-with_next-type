import { getCurretnUser } from "@/actions/getCurrentUser";
import Prisma from "@/libs/prismadb";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const currentUser = await getCurretnUser();
        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();
        const { comment, rating, product } = body;

        // Check if product or product.review is undefined
        if (!product) {
            return NextResponse.error();
        }

        const deliveryOrder = currentUser.Orders.some(
            (order) =>
                order.products.find((item) => item.id === product.id) &&
                order.deliveryStatus === "delivered"
        );

        // Check if currentUser.Orders is undefined
        if (!currentUser.Orders || !deliveryOrder) {
            return NextResponse.error();
        }

        const userReview = product.reviews.find(
            (review: Review) => review.userId === currentUser.id
        );

        if (userReview) {
            console.log(userReview, 'Review already exists');
            return NextResponse.error();
        }

        const newReview = await Prisma.review.create({
            data: {
                comment: comment,
                rating: rating,
                productId: product.id,
                userId: currentUser.id,
            },
        });

        console.log(newReview, 'New Review created');

        return NextResponse.json(
            {
                Review: newReview,
                Message: "Review is added successfully",
            },
            { status: 201, statusText: "Review is created" }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error();
    } finally {
        await Prisma.$disconnect();
    }
};



export const PUT = async (request: Request) => {
    try {
        const currentUser = await getCurretnUser();
        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();
        const { reviewId, comment, rating } = body;

        // Check if reviewId is provided
        if (!reviewId) {
            return NextResponse.error();
        }

        // Fetch the existing review to check ownership and existence
        const existingReview = await Prisma.review.findUnique({
            where: { id: reviewId },
        });

        // Check if the review exists and belongs to the current user
        if (!existingReview || existingReview.userId !== currentUser.id) {
            console.log("Review not found or unauthorized");
            return NextResponse.error();
        }

        // Update the existing review
        const updatedReview = await Prisma.review.update({
            where: { id: reviewId },
            data: { comment, rating },
        });

        console.log(updatedReview, "Review updated successfully");

        return NextResponse.json(
            {
                Review: updatedReview,
                Message: "Review updated successfully",
            },
            { status: 200, statusText: "Review is updated" }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error();
    } finally {
        await Prisma.$disconnect();
    }
};