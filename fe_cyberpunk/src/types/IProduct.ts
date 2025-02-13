export interface IProduct {
    id: number;
    href?: string;
    imageAlt: string;
    imageSrc: string;
    name: string;
    price: string;
    trackingNumber: string;
    state: ProductState;
}

export enum ProductState {
    Available,
    Purchased,
    Shipped,
    Unavailable
}