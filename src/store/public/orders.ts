import request from "@/server/request";
import PublicOrdersType from "@/types/public-orders";
import { create } from "zustand";

interface OrdersUserStoreType {
  loading: boolean;
  data: PublicOrdersType[];
  getOrders: () => void;
}

const useOrdersUserStore = create<OrdersUserStoreType>()((set, get) => ({
  loading: false,
  data: [],
  getOrders: async () => {
    try {
      set({ loading: true });
      const { data } = await request.get<PublicOrdersType[]>("auth/payments");
      set({data})
    } finally {
      set({ loading: false });
    }
  },
}));

export default useOrdersUserStore;
