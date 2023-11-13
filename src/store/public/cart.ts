import { CARD_CART } from "@/constants";
import Products from "@/types/products";
import { toast } from "react-toastify";
import { create } from "zustand";

interface CartStoreType {
  loading: boolean;
  data: Products[];
  controlProductInCart: (el: Products) => void;
}

const dataJson =
  typeof window !== "undefined" ? localStorage.getItem(CARD_CART) : false;
const datal: Products[] = dataJson ? JSON.parse(dataJson) : [];

const useCartStore = create<CartStoreType>()((set, get) => ({
  loading: false,
  data: datal,
  controlProductInCart: (el) => {
    if (el !== null) {
      const newData = get().data;
      const toggle = newData.find((data) => data?._id === el?._id);
      if (toggle) {
        const newDatas: Products[] = newData.filter(
          (data) => data?._id !== el?._id
        );
        if (newDatas.length === 0) {
          localStorage.removeItem(CARD_CART);
        } else {
          localStorage.setItem(CARD_CART, JSON.stringify(newDatas));
        }
        set({ data: newDatas });
      } else {
        el.customQuantity = 1;
        newData.push(el);
        localStorage.setItem(CARD_CART, JSON.stringify(newData));
        set({ data: newData });
      }
    } else {
      toast.error("Bu mahsulotni qo'sha olmaysiz!");
    }
  },
}));

export default useCartStore;
