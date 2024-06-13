import {create} from 'zustand';
import {dataArray} from '../db/index'

const level = localStorage.getItem("progress")
const LevelsStore = create((set, get) => ({
    level: level ? level : 1, 
    words: [],
    setWords : () => {
        let index 
        if(get().level < 4){
            index = get().level -1 
        } else {
            index = (get().level - 1) % 3
        }
        set(() => ({words : dataArray[index].sort((a,b) => a.length - b.length)}))
    },
    setLevel: () => set(() => ({level: get().level +1}))
}));


export default LevelsStore