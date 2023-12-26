export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en', {
        style: "currency",
        currency: "inr"
    }).format(amount)

}