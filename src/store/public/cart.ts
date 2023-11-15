import { CARD_CART } from "@/constants";
import Products from "@/types/products";
import { toast } from "react-toastify";
import { create } from "zustand";

interface CartStoreType {
  loading: boolean;
  data: Products[];
  controlProductInCart: (el: Products) => void;
  controlQuantityInCart: (type: string, el: Products) => void;
  deleteInCart: (el: Products) => void;
}

const dataJson =
  typeof window !== "undefined" ? localStorage.getItem(CARD_CART) : false;
const cartData: Products[] = dataJson ? JSON.parse(dataJson) : [];

const useCartStore = create<CartStoreType>()((set, get) => ({
  loading: false,
  data: cartData,
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
        if (el.quantity > 0) {
          el.customQuantity = 1;
          newData.push(el);
          toast.success(`${el.title} savatchaga qo'shildi!`);
          localStorage.setItem(CARD_CART, JSON.stringify(newData));
          set({ data: newData });
        } else {
          toast.error("Ushbu mahsulot tugagan!");
        }
      }
    } else {
      toast.error("Bu mahsulotni qo'sha olmaysiz!");
    }
  },
  controlQuantityInCart: (type, el) => {
    const newData = get().data;
    switch (type) {
      case "increment": {
        if (el.customQuantity < el.quantity) {
          el.customQuantity++;
          localStorage.setItem(CARD_CART, JSON.stringify(newData));
          set({ data: newData });
        } else {
          toast.error(`Jami mahsulot soni ${el.quantity} dona`);
        }
        break;
      }
      case "decrement": {
        if (el.customQuantity > 1) {
          el.customQuantity--;
          localStorage.setItem(CARD_CART, JSON.stringify(newData));
          set({ data: newData });
        } else {
          const newDatas = newData.filter((pr) => pr._id !== el._id);
          if(newDatas.length === 0){
            localStorage.removeItem(CARD_CART)
          } else {
            localStorage.setItem(CARD_CART, JSON.stringify(newDatas));
          }
          set({ data: newDatas });
        }
        break;
      }
    }
  },
  deleteInCart: (el) => {
    const newData = get().data.filter((pr) => pr._id !== el._id);
    localStorage.setItem(CARD_CART, JSON.stringify(newData));
    set({ data: newData });
  }
}));

export default useCartStore;
