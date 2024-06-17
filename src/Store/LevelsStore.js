import { create } from "zustand";
import { dataArray } from "../db/index";

const level = localStorage.getItem("progress");
const LevelsStore = create((set, get) => ({
  level: level ? level : 1,
  words: [],
  isActiveTab: true,
  tabsId: "",
  setWords: () => {
    const level = get().level;
    const index = (level - 1) % 3;
    set(() => ({
      words: dataArray[index].sort((a, b) => a.length - b.length),
    }));
  },
  setLevel: () => set(() => ({ level: Number(get().level) + 1 })),
  setIsActiveTab: (value) => set(() => ({ isActiveTab: value })),
  setTabsId: (value) => set(() => ({ tabsId: value })),
}));

export default LevelsStore;
