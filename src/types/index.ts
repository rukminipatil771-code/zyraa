export type CategoryName =
  | "Women's Fashion"
  | "Men's Fashion"
  | "Shoes"
  | "Bags"
  | "Accessories"
  | "Beauty and Skincare"
  | "Electronics"
  | "Home and Lifestyle";

export type CollectionTag =
  | "new-arrival"
  | "best-seller"
  | "trending"
  | "special-offer";

export type ViewRoute =
  | "home"
  | "shop"
  | "product"
  | "wishlist"
  | "auth"
  | "about"
  | "contact";

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "discount-desc";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryName;
  description: string;
  details: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sizes?: string[];
  colors?: ColorOption[];
  collections: CollectionTag[];
  inStock: boolean;
  tag?: string;
}

export interface CartItem {
  cartKey: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  name: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}
