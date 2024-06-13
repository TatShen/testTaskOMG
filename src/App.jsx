import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { WordsBlock } from "./Components/WordsBlock/WordsBlock";
import { LettersBlock } from "./Components/LettersBlock/LettersBlock";
import { Enter } from "./Components/Enter/Enter";
import { Modal } from "./Components/Modal/Modal";
import { useStore } from "zustand";
import LevelsStore from "./Store/LevelsStore";
import EnterStore from "./Store/EnterStore";


function App() {
  const [isOld, setIsOld] = useState(false);
  const { level, words, setWords, setLevel } = useStore(LevelsStore);
  const { usersWords, clearUsersWords } = useStore(EnterStore);

  useEffect(() => {
    setWords();
    localStorage.setItem("progress", level);
  }, [level, setWords]);

  useEffect(() => {
    const storageHandler = () => {
      const storedProgress = localStorage.getItem("progress");
      const currentProgress = parseInt(level);
      const storedGuessWords = JSON.parse(localStorage.getItem("guessWords"))
      if (
        (storedProgress && parseInt(storedProgress) > currentProgress) ||
        (storedGuessWords && usersWords.length < storedGuessWords.length)
      ) {
        setIsOld(true);
      }
    };

    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("storage", storageHandler);
    };
  }, [level, usersWords.length]);

  const getNextLevel = () => {
    setLevel();
    setWords();
    clearUsersWords();
    localStorage.setItem('guessWords', JSON.stringify([]))
  };

  return (
    <div className={styles.mainContainer}>
      {isOld && <Modal />}
      {words.length === usersWords.length ? (
        <div className={styles.win}>
          <p>Уровень {level} пройден</p>
          <h2>Изумительно!</h2>
          <button className={styles.next} onClick={getNextLevel}>
            Уровень {Number(level) + 1}
          </button>
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
