import {create} from 'zustand';
import {dataArray} from '../db/index'
const LevelsStore = create(() => ({
    firstLevel : dataArray[0].sort((a,b) => a.length - b.length),
}));


export default LevelsStore