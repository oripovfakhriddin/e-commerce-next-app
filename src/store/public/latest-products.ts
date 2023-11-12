import request from "@/server/request";
import Products from "@/types/products";
import { create } from "zustand";

interface LatestProductsStoreType {
  loading: boolean;
  latestProducts: Products[];
  getLatestProducts: () => void;
}

const useLatestProductsStore = create<LatestProductsStoreType>()(
  (set, get) => ({
    loading: false,
    latestProducts: [],
    getLatestProducts: async () => {
      try {
        set({ loading: true });
        const { data }: {data: Products[]} = await request.get("last-products");
        set({ latestProducts: data });
      } finally {
        set({ loading: false });
      }
    },
  })
);

export default useLatestProductsStore;
