import { useEffect, useState, useRef } from "react";
import LevelsStore from "../../Store/LevelsStore";
import { getLetters } from "../../utils/getLetters";

import styles from "./LettersBlock.module.scss";
import { Letter } from "../Letter/Letter";
import { useStore } from "zustand";
import { useResize } from "../../hooks/useResize";

export const LettersBlock = () => {
  const [letters, setLetters] = useState([]);
  const { words } = useStore(LevelsStore);
  const blockRef = useRef(null);
  const width = useResize();

  const [R, setR] = useState();
  useEffect(() => {
    setLetters(getLetters(words));
  }, [words]);

  useEffect(() => {
    if (blockRef.current) {
      setR(blockRef.current.offsetWidth / 2 - 5);
    }
  }, [blockRef, width]);

  return (
    <div
      className={styles.container}
     
    >
      <div className={styles.lettersBlock} ref={blockRef}>
        <div className={styles.center} id="center">
          {letters.map((letter, index) => {
            const angle = (index / letters.length) * 2 * Math.PI - Math.PI / 2;
            const x = R * Math.cos(angle) - 95 / 2;
            const y = R * Math.sin(angle) - 95 / 2;
            const style = {
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
            };

            return (
              <Letter
                key={index}
                className={styles.letter}
                style={style}
                letter={letter}
                parent="center"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
