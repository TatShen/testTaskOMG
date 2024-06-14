import {create} from 'zustand';
import {dataArray} from '../db/index'

const level = localStorage.getItem("progress")
const LevelsStore = create((set, get) => ({
    level: level ? level : 1, 
    words: [],
    setWords: () => {
        const level = get().level;
        const index = level < 4 ? level - 1 : (level - 1) % 3;
        set(() => ({ words: dataArray[index].slice().sort((a, b) => a.length - b.length) }));
    },
    setLevel: () => set(() => ({level: Number(get().level) +1}))
}));


export default LevelsStore