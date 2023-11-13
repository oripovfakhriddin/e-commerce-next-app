import request from "@/server/request";
import Category from "@/types/category";
import { create } from "zustand";

interface CategoryStoreType {
  data: Category[];
  loading: boolean;
  getData: () => void;
}

const useCategoryStore = create<CategoryStoreType>()((set, get) => ({
  loading: false,
  data: [],
  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: Category[] } = await request.get("category");
      set({ data: data });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
