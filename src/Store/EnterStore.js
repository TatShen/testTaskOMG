import { create } from "zustand";

const EnterStore = create((set,get) => ({
  enter: [],
  usersWords: [],
  setEnter: (newEnter) =>
    set((state) => ({ enter: [...state.enter, newEnter] })),
  setUsersWords: () => set((state) => ({ usersWords: [...state.usersWords, get().enter.join('')] })),
}));

export default EnterStore;
