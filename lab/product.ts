// src/product.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }
  
  export const products: Product[] = [];