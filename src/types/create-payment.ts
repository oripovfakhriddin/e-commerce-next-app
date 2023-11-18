import { CreatePaymentCartType } from ".";

interface CreatePaymentType {
  cart: CreatePaymentCartType[];
  comment?: string;
}

export default CreatePaymentType;