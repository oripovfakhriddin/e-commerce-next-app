import request from "@/server/request";
import Category from "@/types/category";
import { create } from "zustand";

interface CategoryStoreType {
  data: Category[];
  loading: boolean;
  getCategory: () => void;
}

const useCategoryState = create<CategoryStoreType>()((set, get) => ({
  loading: false,
  data: [],
  getCategory: async () => {
    try {
      set({ loading: true });
      const { data } = await request.get<Category[]>("category");
      set({ data });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryState;
