import { create } from "zustand";
import LevelsStore from "./LevelsStore";

const guessWords = JSON.parse(localStorage.getItem('guessWords'))

const EnterStore = create((set, get) => ({
  enter: [],
  usersWords: guessWords ? guessWords : [],
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

      localStorage.setItem('guessWords', JSON.stringify(get().usersWords))
    }
  },
  clearUsersWords: function () {
    set(() => ({ usersWords: [] }));
  },
}));

export default EnterStore;
