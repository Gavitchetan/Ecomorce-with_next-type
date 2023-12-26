"use client"
import { usecart } from '@/hooks/usecart'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


// Import statements...

const CheckOutcli = () => {
    const { cartProduct, paymentIntent, hadlePaymentIntent } = usecart();
    const [error, setError] = useState<null | boolean>(null);
    const [loading, setLoading] = useState<null | boolean>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const router = useRouter();

    const handleCreatePayment = async () => {
        setLoading(true);
        setError(false);

        try {
            console.log('api is hiting ', paymentIntent)
            const response = await axios.put('/api/v1/create-payment', {
                items: cartProduct,
                payment_intent_id: paymentIntent,
            });

            setLoading(false);

            if (response.status === 401) {
                router.push('/login');
                return;
            }

            const data = response.data;
            setClientSecret(data.paymentIntent.client_secret);
            hadlePaymentIntent(data.paymentIntent.id);
            console.log(clientSecret, 'secret');
            alert('success');
        } catch (error) {
            setLoading(false);
            setError(true);
            console.error(error, 'err');
            toast.error('Something went wrong.');
        }
    };

    useEffect(() => {
        if (cartProduct) {
            handleCreatePayment();
        }
    }, [cartProduct, paymentIntent]);

    return <div>checkOutcli</div>;
};

export default CheckOutcli;
