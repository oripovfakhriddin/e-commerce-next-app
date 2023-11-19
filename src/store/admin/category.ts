import request from "@/server/request";
import { toast } from "react-toastify";
import { create } from "zustand";
import { RegisterType } from "../auth/auth";
import Category from "@/types/category";



interface CategoryStoreType {
  loading: boolean;
  search: string;
  activePage: number;
  limit: number;
  data: Category[];
  total: number;
  selected: string | null;
  getData: () => void;
  searchData: (newSearch: string) => void;
  setActivePage: (newActicePage: number) => void;
  setLimitPerPage: (limit: number) => void;
  addData: (newData: RegisterType) => void;
  editData: (selected: string) => void;
  deleteData: (selected: string) => void;
}

const useCategoryStore = create<CategoryStoreType>()((set, get) => ({
  loading: false,
  search: "",
  activePage: 1,
  limit: 10,
  data: [],
  total: 0,
  selected: null,
  getData: async () => {
    try {
      const { search, activePage, limit } = get();
      set({ loading: true });
      const params = {
        search,
        page: activePage,
        limit,
      };
      const {
        data,
      } = await request.get<Category[]>("category", { params });
      set({ data, total: data.length });
    } finally {
      set({ loading: false });
    }
  },
  searchData: (newSearch) => {
    set({ search: newSearch });
    get().getData();
  },
  setActivePage: (newActicePage) => {
    console.log(newActicePage);
    set({ activePage: newActicePage });
    get().getData();
  },
  setLimitPerPage: (limit) => {
    set({ limit });
  },
  addData: async (newData) => {
    try {
      set({ loading: true });
      const { data } = await request.post<Category>(`category`, newData);
      get().getData();
    } finally {
      set({ loading: false });
    }
  },
  editData: async (selected) => {
    console.log(selected);
    try {
      set({ loading: true });
      const { data } = await request.get<Category>(`category/${selected}`);
      console.log(data);
    } finally {
      set({ loading: false });
    }
  },
  deleteData: async (selected) => {
    try {
      set({ loading: true });
      await request.delete(`category/${selected}`);
      toast.success("Muvaffaqiyatli o'chirildi!");
      get().getData();
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
