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
}