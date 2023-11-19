import request from "@/server/request";
import { toast } from "react-toastify";
import { create } from "zustand";

interface CartType {
  _id: string;
  product: string;
  quantity: number;
}

export interface PaymentData {
  status: string;
  _id: string;
  userId: string;
  cart: CartType[];
  comment: string;
  createdAt: string;
}

interface PaymentStoreType {
  loading: boolean;
  data: PaymentData[];
  total: number;
  getData: () => void;
  editData: (id: string) => void;
  deleteData: (selected: string) => void;
}

const usePaymentStore = create<PaymentStoreType>()((set, get) => ({
  loading: false,
  data: [],
  total: 0,
  getData: async () => {
    try {
      set({ loading: true });
      const { data } = await request.get<PaymentData[]>("payment");
      set({ data, total: data?.length });
    } finally {
      set({ loading: false });
    }
  },

  editData: async (id) => {
    try {
      set({ loading: true });
      await request.post(`payment/${id}`);
      toast.success("Buyurtma tasdiqlandi");
      get().getData();
    } finally {
      set({ loading: false });
    }
  },
  deleteData: async (selected) => {
    try {
      set({ loading: true });
      await request.delete(`product/${selected}`);
      toast.success("Buyurtmani bekor qildingiz");
      get().getData();
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePaymentStore;
