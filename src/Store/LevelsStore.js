import {create} from 'zustand';
import {firstLevel, secondLevel, thirdLevel } from '../db/index'
const LevelsStore = create(() => ({
    firstLevel : firstLevel.words.sort((a,b) => a.length - b.length),
    secondLevel : secondLevel.words.sort((a,b) => a.length - b.length),
    thirdLevel : thirdLevel.words.sort((a,b) => a.length - b.length)
}));


export default LevelsStore