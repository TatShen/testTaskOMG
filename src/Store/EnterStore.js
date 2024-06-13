import { create } from "zustand";
import LevelsStore from "./LevelsStore";

const EnterStore = create((set, get) => ({
  enter: [],
  usersWords: [],
  setEnter: (newEnter) =>
    set((state) => ({ enter: [...state.enter, newEnter] })),
  setUsersWords: () => {
    if (
      LevelsStore.getState().words.some(
        (item) => item === get().enter.join("")
      ) &&
      !get().usersWords.includes(get().enter.join(""))
    ) {
      set((state) => ({
        usersWords: [...state.usersWords, get().enter.join("")],
      }));
    }
  },
  clearUsersWords: function () {
    set(() => ({ usersWords: [] }));
  },
}));

export default EnterStore;
