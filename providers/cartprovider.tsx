'use client';

// import { CartContextProvider } from "@/hooks/exm";

import { cartContextProvider as CartContext } from "@/hooks/usecart";
import React from "react";


interface cartproviderProps {
    children: React.ReactNode;
}

const CartProviders: React.FC<cartproviderProps> = ({ children }) => {
    return (
        <CartContext>
            {children}
        </CartContext>
    )
}

export default CartProviders