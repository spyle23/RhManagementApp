import { User } from "@/types/user";
import { create } from "zustand";

type IApplication = {
  user: User | null;
  logout: () => void;
  login: (user: User) => void;
};

export const useApplication = create<IApplication>()((set) => ({
  user: null,
  login: (val) =>
    set((state) => ({
      ...state,
      user: val,
    })),
  logout: () => set((state) => ({ ...state, user: null })),
}));