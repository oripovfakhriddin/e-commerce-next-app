import { FAVOURITE_CART } from "@/constants";
import Products from "@/types/products";
import { toast } from "react-toastify";
import { create } from "zustand";

interface FavouriteStoreType {
  loading: boolean;
  data: Products[];
  addToFavourite: (el: Products) => void;
}

let favouriteLoading = true;

const dataJson =
  typeof window !== "undefined" ? localStorage.getItem(FAVOURITE_CART) : false;
const favouriteData: Products[] = dataJson ? JSON.parse(dataJson) : [];

favouriteLoading = false;

const useFavouriteStore = create<FavouriteStoreType>()((set, get) => ({
  loading: favouriteLoading,
  data: favouriteData,
  addToFavourite: (el) => {
    if (el !== null) {
      const newData = get().data;
      const toggle = newData.find((data) => data?._id === el?._id);
      if (toggle) {
        const newDatas: Products[] = newData.filter(
          (data) => data?._id !== el?._id
        );
        if (newDatas.length === 0) {
          localStorage.removeItem(FAVOURITE_CART);
        } else {
          localStorage.setItem(FAVOURITE_CART, JSON.stringify(newDatas));
        }
        toast.error(`${el.title} sevimlilardan o'chirildi`);
        set({ data: newDatas });
      } else {
        newData.push(el);
        toast.success(`${el.title} sevimlilarga qo'shildi!`);
        localStorage.setItem(FAVOURITE_CART, JSON.stringify(newData));
        set({ data: newData });
      }
    } else {
      toast.error("Bu mahsulotni qo'sha olmaysiz!");
    }
  },
}));

export default useFavouriteStore;
