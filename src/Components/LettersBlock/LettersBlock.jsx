import { useEffect, useState } from "react";
import LevelsStore from "../../Store/LevelsStore";
import { getLettersSet } from "../../utils/getLettersSet";

import styles from "./LettersBlock.module.scss";
import { Letter } from "../Letter/Letter";
import EnterStore from "../../Store/EnterStore";

export const LettersBlock = () => {
  const [letters, setLetters] = useState([]);
  const R = 125;
  useEffect(() => {
    setLetters(getLettersSet(LevelsStore.getState().firstLevel));
  }, []);

  const [isTracking, setIsTracking] = useState(false);
  const [positions, setPositions] = useState([]);
  const [hoveredElements, setHoveredElements] = useState([]);

  const handleMouseDown = (e) => {
    setIsTracking(true);
    EnterStore.setState({ enter: [] });
    setPositions((prevLines) => [...prevLines, { x: e.clientX, y: e.clientY }])
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
      setPositions((prevLines) => [...prevLines, { x: e.clientX, y: e.clientY }])
    }
  };

  const handleMouseUp = () => {
    setIsTracking(false);
    EnterStore.getState().setUsersWords()
    hoveredElements.forEach((element) => {
      element.className = styles.letter
    });
    setHoveredElements([])
    EnterStore.setState({ enter: [] })
    console.log(positions)
  };

  return (
    <div
      className={styles.container}
      onMouseDown={(e) =>  handleMouseDown(e)}
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
      <svg className={styles.svg}>
        {positions.map((point, index) => {
          if (index === 0) return null; 
          const prevPoint = positions[index - 1]; 
          return (
            <line
              className={styles.lines}
              key={index}
              x1={prevPoint.x}
              y1={prevPoint.y}
              x2={point.x}
              y2={point.y}
            />
          );
        })}
      </svg>
    </div>
  );
};
