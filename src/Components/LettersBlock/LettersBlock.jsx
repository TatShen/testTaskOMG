import { useEffect, useState} from "react";
import LevelsStore from "../../Store/LevelsStore";
import { getLettersSet } from "../../utils/getLettersSet";

import styles from "./LettersBlock.module.scss";
import { Letter } from "../Letter/Letter";

export const LettersBlock = () => {
  const [letters, setLetters] = useState([]);
  const R = 125
  useEffect(() => {
    setLetters(getLettersSet(LevelsStore.getState().firstLevel));
  }, []);

 

  return (
    <div className={styles.lettersBlock}>
     <div className={styles.center}>
        {letters.map((letter, index) => {
          const angle = (index / letters.length) * 2 * Math.PI - Math.PI / 2;
          const x = R * Math.cos(angle) - 95 / 2;
          const y = R * Math.sin(angle) - 95 / 2;
          const style = {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
          };
          return (
            <Letter key={index} className={styles.letter} style={style} letter={letter} />
          );
        })}
      </div>
    </div>
  );
};
