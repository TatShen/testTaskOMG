import { useStore } from "zustand";
import LevelsStore from "../../Store/LevelsStore";
import { WordsBlock } from "../WordsBlock/WordsBlock";
import { Enter } from "../Enter/Enter";
import { LettersBlock } from "../LettersBlock/LettersBlock";
import Canvas from "../Lines/Canvas";
import styles from "./PlayScreen.module.scss";
import { useState } from "react";

export const PlayScreen = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { level } = useStore(LevelsStore);
  return (
    <div
      className={styles.play}
      onMouseDown={() => setIsDrawing(true)}
      onTouchStart={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
      onTouchEnd={() => setIsDrawing(false)}
    >
      <h1>Уровень {level}</h1>
      <WordsBlock />
      <Enter />
      <Canvas className={styles.canvas} isDraw={isDrawing} />
      <LettersBlock />
    </div>
  );
};
