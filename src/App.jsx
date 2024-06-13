import { useState } from "react";
import styles from "./App.module.scss";
import { WordsBlock } from "./Components/WordsBlock/WordsBlock";
import { LettersBlock } from "./Components/LettersBlock/LettersBlock";
import { Enter } from "./Components/Enter/Enter";
import { Modal } from "./Components/Modal/Modal";
import { useStore } from "zustand";
import LevelsStore from "./Store/LevelsStore";
import EnterStore from "./Store/EnterStore";

function App() {
  const [level, setLevel] = useState(1);
  const [isOld, setIsOld] = useState(false);
  const { firstLevel } = useStore(LevelsStore);
  const { usersWords } = useStore(EnterStore);

  return (
    <div className={styles.mainContainer}>
      {isOld ? <Modal /> : ""}
      {firstLevel.length === usersWords.length ? (
        <div className={styles.win}>
          <p>Уровень {level} пройден</p>
          <h2>Изумительно!</h2>
          <button className={styles.next}>Уровень {level + 1}</button>
        </div>
      ) : (
        <div className={styles.play}>
          <h1>Уровень {level}</h1>
          <WordsBlock />
          <Enter />
          <LettersBlock />
        </div>
      )}
    </div>
  );
}

export default App;
