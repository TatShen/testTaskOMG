import { useEffect, useState } from "react";
import LevelsStore from "../../Store/LevelsStore";
import { getLettersSet } from "../../utils/getLettersSet";

import styles from "./LettersBlock.module.scss";
import { Letter } from "../Letter/Letter";
import EnterStore from "../../Store/EnterStore";
import { useStore } from "zustand";
import { SvgLines } from "../Lines/SvgLines";
import { useResize } from "../../hooks/useResize";

export const LettersBlock = () => {
  const [letters, setLetters] = useState([]);
  const { words } = useStore(LevelsStore);
  const { setUsersWords, setEnter } = useStore(EnterStore);
  const [isTracking, setIsTracking] = useState(false);
  const [hoveredElements, setHoveredElements] = useState([]);
  const [positions, setPositions] = useState([]);
  const block = document.getElementById("lettersBlock");
  const width = useResize()

  const [R, setR] = useState();
  useEffect(() => {
    setLetters(getLettersSet(words));
    
  }, [words]);

  useEffect(() => {
    if (block) {
      setR(block.offsetWidth / 2);
    }
  }, [block, width])
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
        const container = document.getElementById("container");
        const blockRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const relativeX = targetRect.left - blockRect.left + targetRect.width / 2;
      const relativeY = targetRect.top - blockRect.top + targetRect.height / 2;
        setPositions([...positions, { x: relativeX, y: relativeY }]);
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
    setEnter();
    setPositions([])
  };
  return (
    <div
      className={styles.container}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={handleMouseUp}
      id="container"
      
    >
      <div className={styles.lettersBlock} id="lettersBlock" >
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
      <SvgLines positions={positions} className={styles.lines} />
    </div>
  );
};
