import request from "@/server/request";
import CreatePaymentType from "@/types/create-payment";
import { toast } from "react-toastify";
import { create } from "zustand";

interface CreatePaymentStoreType {
  loading: boolean;
  createPayment: (createPay: CreatePaymentType) => void;
}

const useCreatePaymentStore = create<CreatePaymentStoreType>()((set, get) => ({
  loading: false,
  createPayment: async (createPay) => {
    try {
      set({ loading: true });
      await request.post("payment", createPay);
      toast.success("Buyurmangiz muvaffaqiyati jo'natildi");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCreatePaymentStore;
