export type Category = {
    _id: string;
    name: string;
    image ?: {
        secure_url:string;
        public_id: string;
    };
}


export type Product = {
    _id: string;
    name: string;
    category: Category;
    stock: number;
    price: number;
    image:{
        secure_url: string;
        public_id: string;
    }
    active: boolean;
}


export type productQuantity = {
    [pId : string] : number
};

export type cartProducts = {
    [pId: string] : Product
};


export type OrderItem = {
    productId:string;
    name:string;
    price:Number;
    quantity:Number;
    subTotal:Number;
}

export type OrderAddress = {
    name: String;
    mobile: Number;
    pincode: Number;
    locality:String;
    city: String;
    state: String;
    address: String;
}

export type PaymentMethods =  "CARD"| "UPI" | "COD"| "NET_BANKING";
export type PaymentStatus =  "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type OrderPayment = {
    method: PaymentMethods ;
    status ?: PaymentStatus;
    paidAmount : number;
    currency : string;
}


export type Order = {
    _id?:string;
    userId: string;
    items:OrderItem[];
    shippingAddress: OrderAddress;
    payment : OrderPayment;
    grandTotal:number;
    orderStatus: string;
}