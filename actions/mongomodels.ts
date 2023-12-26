import mongoose from "mongoose"
// Define Address Schema
const addressSchema = new mongoose.Schema({
    pin: Number,
    city: String,
    country: String,
    line1: String,
    line2: String,
    postal_code: String,
    state: String,
    Near: String,
});

// Define Image Schema
const imageSchema = new mongoose.Schema({
    color: String,
    colorCode: String,
    image: String,
});

// Define CartProducts Schema
const cartProductsSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    category: String,
    brand: String,
    selectedImg: imageSchema,
    quantity: Number,
    price: Number,
});

// Define Order Schema
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    currency: String,
    state: String,
    status: String,
    deliveryStatus: String,
    createdAt: { type: Date, default: Date.now },
    paymentIntentId: { type: String, unique: true },
    products: [cartProductsSchema],
    address: addressSchema,
});

// Define Review Schema
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now },
});

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    description: String,
    price: Number,
    inStock: Boolean,
    images: [imageSchema],
    reviews: [reviewSchema],
    category: String,
});

// Define Account Schema
const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
});

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    emailVerified: Date,
    image: String,
    hashedPassword: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    accounts: [accountSchema],
    Role: { type: String, default: 'user' },
    Orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    Review: [reviewSchema],
});

// Create Mongoose models
export const Address = mongoose.models.Addresss || mongoose.model('Address', addressSchema);
export const Image = mongoose.models.Images || mongoose.model('Image', imageSchema);
export const CartProducts = mongoose.models.CartProducts || mongoose.model('CartProducts', cartProductsSchema);
export const Order = mongoose.model || mongoose.model('Order', orderSchema);
export const Review = mongoose.model || mongoose.model('Review', reviewSchema);
export const Product = mongoose.model || mongoose.model('Product', productSchema);
export const Account = mongoose.models.accounts || mongoose.model('Account', accountSchema);
export const User = mongoose.model('User', userSchema);

// module.exports = { Address, Image, CartProducts, Order, Review, Product, Account, User };
