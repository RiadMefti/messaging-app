import { create } from "zustand";

type State = {
  messages: string[];
  addMessage: (message: string) => void;
};

export const useStore = create<State>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));