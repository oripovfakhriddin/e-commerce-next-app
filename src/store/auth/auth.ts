import { TOKEN, USER, USER_ID } from "@/constants";
import request from "@/server/request";
import User from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import ROLES from "@/types/roles";
import { toast } from "react-toastify";

export interface LoginType {
  username: string;
  password: string;
}

export interface RegisterType {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface UserInformationType {
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

interface LoginStoreType {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  data: User | null;
  login: (loginData: LoginType | null, router: AppRouterInstance) => void;
  userRegister: (registerData: RegisterType, router: AppRouterInstance) => void;
  changeUserInformation: (userData: UserInformationType, router: AppRouterInstance) => void;
  // getUserInformation: () => void;
}

const dataJson =
  typeof window !== "undefined" ? localStorage.getItem(USER) : false;
const dataUser: User = dataJson ? JSON.parse(dataJson) : null;

const useAuthStore = create<LoginStoreType>()((set, get) => ({
  token: dataUser?.accesstoken || null,
  loading: false,
  isAuthenticated: Boolean(Cookies.get(USER_ID)),
  data: dataUser,
  login: async (loginData, router) => {
    try {
      set({ loading: true });
      const { data } = await request.post<User>("auth/login", loginData);
      request.defaults.headers.Authorization = `Bearer ${data?.accesstoken}`;
      Cookies.set(TOKEN, data.accesstoken);
      localStorage.setItem(USER, JSON.stringify(data));
      Cookies.set(USER_ID, data.user._id);
      set({ data, token: data.accesstoken, isAuthenticated: true });
      if (data?.user?.role === ROLES.ADMIN) {
        router.push("/admin");
      }
      if (data.user.role === ROLES.USER) {
        router.push("/");
      }
    } finally {
      set({ loading: false });
    }
  },
  userRegister: async (registerData, router) => {
    try {
      set({ loading: true });
      const { data } = await request.post<User>("auth/register", registerData);
      router.push("/login");
    } finally {
      set({ loading: false });
    }
  },
  changeUserInformation: async (userData, router) => {
    try {
      set({ loading: true });
      const {data} = await request.put<UserInformationType>("auth/update", userData)
      console.log(data);
      
      if(data) {
        toast.success("Muvaffaqiyatli o'zgartirildi, Hisobingizga qaytadan kiring!")
        router.push("/login")
      }
    } finally {
      set({ loading: false });
    }
  }
}));

export default useAuthStore;
