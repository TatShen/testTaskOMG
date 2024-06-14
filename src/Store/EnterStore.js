import { create } from "zustand";
import LevelsStore from "./LevelsStore";

const guessWords = JSON.parse(localStorage.getItem('guessWords'))

const EnterStore = create((set, get) => ({
  enter: [],
  usersWords: guessWords ? guessWords : [],
  setEnter: (newEnter) =>
    set((state) => ({ enter: newEnter ?  [...state.enter, newEnter] : [] })),
  setUsersWords: () => {
    const word = get().enter.join("")
    if (
      LevelsStore.getState().words.some(
        (item) => item === word
      ) &&
      !get().usersWords.includes(word)
    ) {
      set((state) => ({
        usersWords: [...state.usersWords, word],
      }));
    }
    localStorage.setItem('guessWords', JSON.stringify(get().usersWords))
  },
  clearUsersWords: function () {
    set(() => ({ usersWords: [] }));
    localStorage.setItem('guessWords', JSON.stringify([]))
  },
}));

export default EnterStore;
