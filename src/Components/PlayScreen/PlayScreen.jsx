import { useStore } from "zustand";
import LevelsStore from "../../Store/LevelsStore";
import { WordsBlock } from "../WordsBlock/WordsBlock";
import { Enter } from "../Enter/Enter";
import { LettersBlock } from "../LettersBlock/LettersBlock";
import Canvas from "../Lines/Canvas";
import styles from "./PlayScreen.module.scss";

export const PlayScreen = () => {
  const { level } = useStore(LevelsStore);
  return (
    <div className={styles.play}>
     <Canvas className={styles.canvas} />
      <h1>Уровень {level}</h1>
      <WordsBlock />
      <Enter />
      <LettersBlock />
    </div>
  );
};
