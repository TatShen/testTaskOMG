import { useEffect, useState } from "react";
import LevelsStore from "../../Store/LevelsStore";
import { getLettersSet } from "../../utils/getLettersSet";

import styles from "./LettersBlock.module.scss";
import { Letter } from "../Letter/Letter";
import EnterStore from "../../Store/EnterStore";
import { useStore } from "zustand";
import { SvgLines } from "../Lines/SvgLines";

export const LettersBlock = () => {
  const [letters, setLetters] = useState([]);
  const { words } = useStore(LevelsStore);
  const {setUsersWords} = useStore(EnterStore)
  const [isTracking, setIsTracking] = useState(false);
  const [hoveredElements, setHoveredElements] = useState([]);
  const [positions, setPositions] = useState([]);
  const R = 125;
  useEffect(() => {
    setLetters(getLettersSet(words));
  }, [words]);

  const handleMouseDown = () => {
    setIsTracking(true);
    EnterStore.setState({ enter: [] });
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
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setPositions([...positions, { x: centerX, y: centerY}]);
      }
    }
  };

  const handleMouseUp = () => {
    setIsTracking(false);
    setUsersWords();
    hoveredElements.forEach((element) => {
      element.className = styles.letter;
    });
    setHoveredElements([]);
    EnterStore.setState({ enter: [] });
    setPositions([])
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
      <SvgLines positions={positions} className={styles.lines}/>
    </div>
  );
};
