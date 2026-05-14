export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  sold: number;
  rating: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
