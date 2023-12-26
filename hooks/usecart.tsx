// import { createContext } from "react";
import { carProduct } from "@/app/(site)/product/[pId]/productdetailspage";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
type cartType = {
    cartTotalqty: number;
    cartTotalAmount: number;
    cartProduct: carProduct[] | null,
    hadnleAddproductCart: (product: carProduct) => void,
    hadleRemoveProduct: (product: carProduct) => void,
    handleCartQTYdecrement: (product: carProduct) => void,
    handleCartQTYincrement: (product: carProduct) => void,
    hadleClearcartProducts: (product: carProduct) => void,
    paymentIntent: string | null,
    hadlePaymentIntent: (value: string | null) => void,
}

export const cartContext = createContext<cartType | null>(null)
interface carprops {
    [propname: string]: any;
}
export const cartContextProvider = (props: carprops) => {
    const [cartProduct, setcartProduct] = useState<carProduct[] | null>(null)
    const [cartTotalqty, setcartTotalqtys] = useState<number>(0)
    const [cartTotalAmount, setcartTotalAmount] = useState<number>(0)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
    console.log(cartTotalAmount, 'cartToatalAmount')

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        console.log(cartItems, 'cartItmes')
        const cartProduct: carProduct[] | null = JSON.parse(cartItems)
        const eshopPayment: any = localStorage.getItem('eShopPaymentIntent');
        const paymentIntent: string | null = JSON.parse(eshopPayment)


        setcartProduct(cartProduct);
        setPaymentIntent(paymentIntent)
    }, [setcartProduct])



    /// for add product 
    useEffect(() => {
        const getTotal = () => {
            if (cartProduct) {

                const { qty, total } = cartProduct?.reduce((acc, item) => {
                    const itemTotal = item.price * item.qauntity;
                    acc.total += itemTotal
                    acc.qty += item.qauntity
                    return acc
                }, {
                    total: 0
                    , qty: 0
                })
                setcartTotalqtys(qty ? qty : 0)
                setcartTotalAmount(total)
            }

        }
        getTotal()
    }, [cartProduct])

    const hadnleAddproductCart = useCallback((product: carProduct) => {
        setcartProduct((prev) => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }
            setcartTotalqtys((prevQty) => prevQty + 1);
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            toast.success('Product is added to cart');
            return updatedCart;
        });

    }, [setcartProduct]);
    // for remove product  
    const hadleRemoveProduct = useCallback(
        (product: carProduct) => {
            if (cartProduct) {
                const filterProducts = cartProduct.filter((item) => {
                    return item.id !== product.id
                })
                setcartProduct(filterProducts)
                localStorage.setItem('eShopCartItems', JSON.stringify(filterProducts))
                toast.success("Product remvoe succesfully from cart")
            }
        },
        [cartProduct],
    )

    // for increse qauntity 
    const handleCartQTYincrement = useCallback(
        (product: carProduct) => {

            let updatedCart;
            if (product.qauntity >= 99) {
                return alert('Error Max product must be less then or eqal to 99')
            }
            if (cartProduct) {
                updatedCart = [...cartProduct];

                const existingIndex = cartProduct.findIndex((item) => item.id == product.id)
                if (existingIndex > -1) {
                    updatedCart[existingIndex].qauntity++
                }
            }
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            setcartProduct(updatedCart ? updatedCart : cartProduct)
        },
        [cartProduct],
    )
    // for decrese qauntity 
    const handleCartQTYdecrement = useCallback(
        (product: carProduct) => {
            let updatedCart;
            if (product.qauntity <= 1) {
                return toast.error('product qauntity must be gereter than one or equal to one')
            }
            if (cartProduct) {
                updatedCart = [...cartProduct];
                const existingIndex = cartProduct.findIndex((item) => item.id == product.id)
                if (existingIndex > -1) {
                    updatedCart[existingIndex].qauntity--
                }
            }
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            setcartProduct(updatedCart ? updatedCart : cartProduct)

        },
        [cartProduct],
    )

    // set payment Itntent
    const hadlePaymentIntent = useCallback(
        (value: string | null) => {
            setPaymentIntent(value)
            localStorage.setItem('eshopPayment', JSON.stringify(value))
        },
        [paymentIntent],
    )

    // for decrese qauntity 
    const hadleClearcartProducts = useCallback(
        () => {
            setcartProduct(null)
            setcartTotalqtys(0)
            localStorage.setItem('eShopCartItems', JSON.stringify(null))
        },
        [],
    )

    const value = {
        cartTotalqty,
        cartProduct,
        hadnleAddproductCart,
        hadleRemoveProduct,
        handleCartQTYdecrement,
        handleCartQTYincrement,
        hadleClearcartProducts,
        cartTotalAmount,
        paymentIntent,
        hadlePaymentIntent
    }
    return <cartContext.Provider value={value} {...props} />
}


export const usecart = () => {
    const context = useContext(cartContext);
    if (context == null) {
        throw new Error('usecart must be value use within a carcontextProvider')
    }
    return context
}

// 27:000f