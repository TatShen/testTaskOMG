import * as firstLevelData from './1.json';
import * as secondLevelData from './2.json';
import * as thirdLevelData from './3.json';

const dataArray = [
    Object.values(firstLevelData.words),
    Object.values(secondLevelData.words),
    Object.values(thirdLevelData.words)
  ];

  export { dataArray };