import {
  Beef,
  Soup,
  Salad,
  CupSoda,
  IceCreamBowl,
  UtensilsCrossed,
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  option: string;
  customPrice?: number;
}

export const foodCards: Product[] = [
  {
    id: "1",
    name: "Grilled chicken pieces",
    price: 28.9,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food1.png",
  },
  {
    id: "2",
    name: "Ribeye Steak",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food2.png",
  },
  {
    id: "3",
    name: "Vegetable Stir Fry",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food3.png",
  },
  {
    id: "4",
    name: "Pork Belly Bao",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food4.png",
  },
];
export const PRODUCTS: Product[] = [
  {
    id: "5",
    name: "Filet Mignon",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food5.png",
  },
  {
    id: "6",
    name: "Ribeye Steak",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food6.png",
  },
  {
    id: "7",
    name: "Vegetable Stir Fry",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food7.png",
  },
  {
    id: "8",
    name: "Pork Belly Bao",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food8.png",
  },
  {
    id: "9",
    name: "New York Strip Steak",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food9.png",
  },
  {
    id: "10",
    name: "T-Bone Steak",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food10.png",
  },
  {
    id: "11",
    name: "Sirloin Steak",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food11.png",
  },
  {
    id: "12",
    name: "Chateaubriand",
    price: 39.99,
    originalPrice: 52.99,
    rating: 4.5,
    image: "/branch-admin/foods/food12.png",
  },
];

export const categories = [
  {
    name: "Steaks",
    icon: Beef,
  },
  {
    name: "Starters",
    icon: Soup,
  },
  {
    name: "Sides",
    icon: Salad,
  },
  {
    name: "Drinks",
    icon: CupSoda,
  },
  {
    name: "Desserts",
    icon: IceCreamBowl,
  },
  {
    name: "Lunch Special",
    icon: UtensilsCrossed,
  },
];
