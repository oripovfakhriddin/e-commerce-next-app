import Products from "./products";

interface CartOrders {
    _id: string;
    product: Products;
    quantity: number;
}

interface  PublicOrdersType {
    status: string;
    _id: string;
    userId: string;
    cart: CartOrders[];
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default PublicOrdersType