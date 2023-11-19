import PhotoData from "@/types/photo";

interface UseFormInputs {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  image: PhotoData | null;
  title: string;
  category: string;
  price: string;
  quantity: string;
  description: string;
}

export default UseFormInputs;
