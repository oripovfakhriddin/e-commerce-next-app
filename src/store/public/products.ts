import { LIMIT } from "@/constants";
import request from "@/server/request";
import Products from "@/types/products";
import { create } from "zustand";

interface ApiData {
  total: number;
  products: Products[];
}

interface ProductsStoreType {
  loading: boolean;
  data: Products[];
  activePage: number;
  search: string;
  category: string;
  total: number;
  getData: () => void;
  setSearch: (search: string) => void;
  setActivePage: (value: number) => void;
  setCategory: (category: string) => void;
}

const useProductsStore = create<ProductsStoreType>()((set, get) => ({
  loading: false,
  total: 0,
  data: [],
  activePage: 1,
  search: "",
  category: "all",
  getData: async () => {
    try {
      set({ loading: true });
      const params: {
        search: string;
        page: number;
        limit: number;
        category?: string;
      } = {
        search: get().search,
        page: get().activePage,
        limit: LIMIT,
      };
      if (get().category !== "all") {
        params.category = get().category;
      }
      const {
        data: { total, products },
      } = await request.get<ApiData>("product", {
        params,
      });

      set({ data: products, total });
    } finally {
      set({ loading: false });
    }
  },
  setSearch: (search) => {
    set({ search });
    get().getData();
  },
  setActivePage: (value) => {
    set({ activePage: value });
    get().getData();
  },
  setCategory: (category) => {
    set({ category });
    get().getData();
  },
}));

export default useProductsStore;
