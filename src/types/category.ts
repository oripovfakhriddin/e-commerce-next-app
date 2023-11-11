import Image from "./images";

interface Category {
  name: string;
  _id: string;
  image: Image;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default Category;
