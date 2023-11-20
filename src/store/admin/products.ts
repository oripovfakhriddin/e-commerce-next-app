import request from "@/server/request";
import { toast } from "react-toastify";
import { create } from "zustand";
import { UseFormReset } from "react-hook-form";
import Products from "@/types/products";
import photoData from "@/types/photo";
import UseFormInputs from "@/types/formInputs";
import { SetStateAction } from "react";

interface ApiData {
  total: number;
  products: Products[];
}

export interface FormInputsProduct {
  title?: string | undefined;
  price?: number | undefined;
  quantity?: number | undefined;
  category?: string | undefined;
  description?: string | undefined;
  image?: photoData | undefined;
} 

interface ProductsStoreType {
  loading: boolean;
  search: string;
  activePage: number;
  photo: photoData | undefined;
  category: string;
  isModalOpen: boolean;
  photoLoad: boolean;
  isModalLoad: boolean;
  closeModal: () => void;
  showModal: (reset: UseFormReset<any>) => void;
  limit: number;
  data: Products[];
  total: number;
  selected: string | null;
  setCategory: (id: string) => void;
  uploadPhoto: (file: FormData) => void;
  getData: () => void;
  searchData: (newSearch: string) => void;
  setActivePage: (newActicePage: number) => void;
  setLimitPerPage: (limit: number) => void;
  addData: (newData: object, selected: string | null) => void;
  editData: (selected: string, reset: UseFormReset<FormInputsProduct>) => void;
  deleteData: (selected: string) => void;
}

const useProductsStore = create<ProductsStoreType>()((set, get) => ({
  loading: false,
  search: "",
  activePage: 1,
  limit: 10,
  data: [],
  category: "",
  isModalLoad: false,
  photoLoad: false,
  isModalOpen: false,
  photo: undefined,
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
        data: { total, products },
      } = await request.get<ApiData>("product", { params });
      set({ data: products, total });
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
  addData: async (newData, selected) => {
    try {
      set({ loading: true });
      if (selected === null) {
        const { data } = await request.post<FormInputsProduct>(`product`, newData);
        toast.success("Mahsulot qo'shildi!");
      } else {
        const { data } = await request.put<Products>(
          `product/${selected}`,
          newData
        );
        toast.success("Mahsulot tahrirlandi!");
      }
      get().getData();
    } finally {
      set({ loading: false, isModalOpen: false });
    }
  },
  editData: async (selected, reset) => {
    try {
      set({ loading: true, selected, isModalOpen: true });
      const { data } = await request.get<FormInputsProduct>(`product/${selected}`);
      if(data){
        reset(data)
      }
    } finally {
      set({ loading: false });
    }
  },
  deleteData: async (selected) => {
    try {
      set({ loading: true });
      await request.delete(`product/${selected}`);
      toast.success("Muvaffaqiyatli o'chirildi!");
      get().getData();
    } finally {
      set({ loading: false });
    }
  },
  closeModal: () => {
    set({ isModalOpen: false, photo: undefined });
  },
  showModal: (reset) => {
    set({
      isModalOpen: true,
      selected: null,
      photo: undefined,
      category: "",
    });
    reset({
      title: "",
      price: 0,
      quantity: 0,
      category: "",
      description: "",
    });
  },
  uploadPhoto: async (file) => {
    try {
      set({ photoLoad: true });
      const { data } = await request.post(`upload`, file);
      set({ photo: data });
    } finally {
      set({ photoLoad: false });
    }
  },
  setCategory: (id) => {
    set({ category: id });
  },
}));

export default useProductsStore;
