import { useEffect, useState, useRef } from "react";
import LevelsStore from "../../Store/LevelsStore";
import { getLettersSet } from "../../utils/getLettersSet";

import styles from "./LettersBlock.module.scss";
import { Letter } from "../Letter/Letter";
import EnterStore from "../../Store/EnterStore";
import { useStore } from "zustand";
import { useResize } from "../../hooks/useResize";

export const LettersBlock = () => {
  const [letters, setLetters] = useState([]);
  const { words } = useStore(LevelsStore);
  const { setUsersWords, setEnter, setPositions, clearPositions } =
    useStore(EnterStore);
  const [isTracking, setIsTracking] = useState(false);
  const [hoveredElements, setHoveredElements] = useState([]);
  const blockRef = useRef(null);
  const width = useResize();

  const [R, setR] = useState();
  useEffect(() => {
    setLetters(getLettersSet(words));
  }, [words]);

  useEffect(() => {
    if (blockRef.current) {
      setR(blockRef.current.offsetWidth / 2 - 5);
    }
  }, [blockRef, width]);

  const handleStart = () => {
    setIsTracking(true);
  };

  const handleMove = (e) => {
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
        const container = document.getElementById("mainContainer");
        const blockRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const relativeX =
          targetRect.left - blockRect.left + targetRect.width / 2;
        const relativeY =
          targetRect.top - blockRect.top + targetRect.height / 2;

        setPositions({ x: relativeX, y: relativeY });
      }
    }
  };

  const handleEnd = () => {
    setIsTracking(false);
    setUsersWords();
    hoveredElements.forEach((element) => {
      element.className = styles.letter;
    });
    setHoveredElements([]);
    setEnter();
    clearPositions();
  };
  return (
    <div
      className={styles.container}
      onMouseDown={(e) => handleStart(e)}
      onTouchStart={(e) => handleStart(e.touches[0])}
      onMouseMove={(e) => handleMove(e)}
      onTouchMove={(e) => handleMove(e.touches[0])}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onMouseLeave={handleEnd}
      onTouchCancel={handleEnd}
    >
      <div className={styles.lettersBlock} ref={blockRef}>
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
    </div>
  );
};
