import { User } from "@/types/user";
import { create } from "zustand";

type IApplication = {
  user: User | null;
  loadingApp: boolean;
  logout: () => void;
  login: (user: User) => void;
  changeLoading: (val: boolean) => void;
};

export const useApplication = create<IApplication>()((set) => ({
  user: null,
  loadingApp: true,
  login: (val) =>
    set((state) => ({
      ...state,
      user: val,
      loadingApp: false,
    })),
  changeLoading: (val: boolean) =>
    set((state) => ({ ...state, loadingApp: val })),
  logout: () => set((state) => ({ ...state, user: null })),
}));
