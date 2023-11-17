import { TOKEN, USER, USER_ID } from "@/constants";
import request from "@/server/request";
import User from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import ROLES from "@/types/roles";


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

interface LoginStoreType {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  data: User | null;
  login: (loginData: LoginType | null, router: AppRouterInstance) => void;
  register: (registerData: RegisterType, router: AppRouterInstance) => void;
}

const dataJson =
  typeof window !== "undefined" ? localStorage.getItem(USER) : false;
const dataUser: User = dataJson ? JSON.parse(dataJson) : null;

const useAuthStore = create<LoginStoreType>()((set, get) => ({
  token: dataUser?.accesstoken || null,
  loading: false,
  isAuthenticated: Boolean(dataUser),
  data: dataUser,
  login: async (loginData, router) => {
    try {
      set({ loading: true })
      const { data } = await request.post<User>("auth/login", loginData);
      Cookies.set(TOKEN, data.accesstoken)
      localStorage.setItem(USER, JSON.stringify(data))
      Cookies.set(USER_ID, data.user._id);
      set({ data, token: data.accesstoken, isAuthenticated: true });
      if (data?.user?.role === ROLES.ADMIN) {
        router.push("/admin")
      }
      if (data.user.role === ROLES.USER) {
        router.push("/")
      }
    } finally {
      set({ loading: false })
    }
  },
  register: async (registerData, router) => {

  }
}))

export default useAuthStore;