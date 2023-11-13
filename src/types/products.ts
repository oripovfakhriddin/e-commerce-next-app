import Category from "./category";
import Image from "./images";

interface Products {
  checked: boolean;
  sold: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  image: Image;
  quantity: number;
  category: Category | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  customQuantity: number;
}

export default Products;
