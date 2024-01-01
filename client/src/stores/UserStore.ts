import { User } from "@/types/Type";
import { create } from "zustand";

type UserStoreState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStoreState>((set) => ({

  user: null,
  setUser: (user: User) => set({ user })

}));