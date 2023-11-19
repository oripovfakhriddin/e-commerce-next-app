import request from "@/server/request";
import { toast } from "react-toastify";
import { create } from "zustand";
import { RegisterType } from "../auth/auth";
import UseFormInputs from "@/types/formInputs";
import photoData from "@/types/photo";
import { UseFormReset } from "react-hook-form";
import { SetStateAction } from "react";


interface User {
  role: number;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiData {
  total: number;
  users: User[];
}

interface UsersStoreType {
  loading: boolean;
  search: string;
  activePage: number;
  limit: number;
  photo: photoData | null
  data: User[];
  total: number;
  photoLoad: boolean;
  selected: string | null;
  isModalOpen: boolean;
  isModalLoad: boolean;
  closeModal: () => void;
    showModal: (
      reset: UseFormReset<UseFormInputs>,
      setCategory: React.Dispatch<SetStateAction<string>>,
    ) => void;
  getData: () => void;
  searchData: (newSearch: string) => void;
  setActivePage: (newActicePage: number) => void;
  setLimitPerPage: (limit: number)=>void;
  addData: (newData: RegisterType, selected: string | null) => void;
  editData: (selected: string, reset: UseFormReset<UseFormInputs>) => void;
  deleteData: (selected: string) => void;
  uploadPhoto: (file: FormData) => void;
}

const useUsersStore = create<UsersStoreType>()((set, get) => ({
  loading: false,
  search: "",
  activePage: 1,
  limit: 10,
  photoLoad: false,
  data: [],
  total: 0,
  photo: {
    _id: "",
    url: "",
  },
  selected: null,
  isModalOpen: false,
      isModalLoad: false,
      closeModal: () => {
        set({ isModalOpen: false, photo: null });
      },
      showModal: (reset, setCategory) => {
        set({ isModalOpen: true, selected: null, photo: null });
        reset({
          firstName: "",
          lastName: "",
          username: "",
          phoneNumber: "",
          password: "",
          category: "",
          title: "",
          price: "",
          image: {
            url: "",
            _id: "",
          },
          quantity: "",
        });
        setCategory("");
      },
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
        data: { total, users },
      } = await request.get<ApiData>("user", { params });
      set({ data: users, total });
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
    set({limit})
  },
  addData: async (newData, selected) => {
    try {
      set({ isModalLoad: true });
      if(selected===null){
        await request.post("user", newData);
      } else {
        await request.put(`user/${selected}`, newData);
      }
      const { getData } = get();
      set({ isModalOpen: false });
      getData()
    } finally {
      set({ isModalLoad: false });
    }
  },
  editData: async (selected, reset) => {
    
    try {
      set({selected, loading: true, isModalOpen: true });
      const { data } = await request.get<User>(`user/${selected}`);
      // set({image: data?.image})
      reset(data)
    } finally {
      set({ loading: false });
    }
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
  deleteData: async (selected) => {
    try {
      set({ loading: true });
      await request.delete(`user/${selected}`);
      toast.success("Muvaffaqiyatli o'chirildi!");
      get().getData();
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUsersStore;
