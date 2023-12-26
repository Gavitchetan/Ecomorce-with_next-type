import { User } from "@prisma/client";

//
export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string;
    updatedAt: string;
    emailVerified?: string; // Change here to make it optional
};



export type OrderType = {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    state: string;
    status: string;
    deliveryStatus: string;
    createdAt: Date;
    paymentIntentId: string;
    products: any[]; // Add the correct type for products if available
    address: any; // Add the correct type for address if available
};

export type UserType = {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    Role: string;
    Orders: OrderType[];
};