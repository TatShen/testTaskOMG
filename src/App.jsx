import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { Modal } from "./Components/Modal/Modal";
import { useStore } from "zustand";
import LevelsStore from "./Store/LevelsStore";
import EnterStore from "./Store/EnterStore";
import { WinScreen } from "./Components/WinScreen/WinScreen";
import { PlayScreen } from "./Components/PlayScreen/PlayScreen";

function App() {
  const [isOpenInOtherTab, setIsOpenInOtherTab] = useState(false);
  const { level, words, setWords } = useStore(LevelsStore);
  const { usersWords } = useStore(EnterStore);
  const [ isWin, setIsWin ] = useState(false);

  useEffect(() => {
    setWords();
    localStorage.setItem("progress", level);
  }, [level, setWords]);

  useEffect(() => {
    setIsWin(words.length === usersWords.length);
  }, [setIsWin, usersWords.length, words.length]);

  useEffect(() => {
    const storageHandler = () => {
      const storedProgress = localStorage.getItem("progress");
      const currentProgress = parseInt(level);
      const storedGuessWords = JSON.parse(localStorage.getItem("guessWords"));
      if (
        (storedProgress && parseInt(storedProgress) > currentProgress) ||
        (storedGuessWords && usersWords.length < storedGuessWords.length)
      ) {
        setIsOpenInOtherTab(true);
      }
    };

    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("storage", storageHandler);
    };
  }, [level, usersWords.length]);

  return (
    <>
      {isOpenInOtherTab && <Modal />}
      <div className={styles.mainContainer} id="mainContainer">
        {isWin ? <WinScreen /> : <PlayScreen />}
      </div>
    </>
  );
}

export default App;
