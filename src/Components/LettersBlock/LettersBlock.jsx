import { useEffect, useState, useRef } from "react";
import LevelsStore from "../../Store/LevelsStore";
import { getLettersSet } from "../../utils/getLettersSet";

import styles from "./LettersBlock.module.scss";
import { Letter } from "../Letter/Letter";
import EnterStore from "../../Store/EnterStore";
import { useStore } from "zustand";
import { Lines } from "../Lines/Lines";

export const LettersBlock = () => {
  const [letters, setLetters] = useState([]);
  const { words } = useStore(LevelsStore);
  const R = 125;
  const [isTracking, setIsTracking] = useState(false);
  const [hoveredElements, setHoveredElements] = useState([]);
  const positionsRef = useRef([]);
  useEffect(() => {
    setLetters(getLettersSet(words));
  }, [words]);

  const handleMouseDown = (e) => {
    setIsTracking(true);
    EnterStore.setState({ enter: [] });
    positionsRef.current.push({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isTracking) {
      const x = e.clientX;
      const y = e.clientY;
      const target = document.elementFromPoint(x, y);
      if (
        target &&
        target.classList.contains(styles.letter) &&
        !hoveredElements.includes(target)
      ) {
        setHoveredElements((prevHoveredElements) => [
          ...prevHoveredElements,
          target,
        ]);
        target.className = styles.hovered;
        EnterStore.getState().setEnter(target.textContent);
      }
      positionsRef.current.push({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsTracking(false);
    EnterStore.getState().setUsersWords();
    hoveredElements.forEach((element) => {
      element.className = styles.letter;
    });
    setHoveredElements([]);
    EnterStore.setState({ enter: [] });
  };
  return (
    <div
      className={styles.container}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.lettersBlock}>
        <div className={styles.center}>
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
              />
            );
          })}
        </div>
      </div>
      <Lines className={styles.lines}/>
    </div>
  );
};
