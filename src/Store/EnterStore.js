import { create } from "zustand";

const EnterStore = create((set,get) => ({
  enter: [],
  usersWord: [],
  setEnter: (newEnter) =>
    set((state) => ({ enter: [...state.enter, newEnter] })),
  setUsersWord: () => set((state) => ({ usersWord: [...state.usersWord, get().enter.join('')] })),
}));

export default EnterStore;
