import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { Modal } from "./Components/Modal/Modal";
import { useStore } from "zustand";
import LevelsStore from "./Store/LevelsStore";
import EnterStore from "./Store/EnterStore";
import { WinScreen } from "./Components/WinScreen/WinScreen";
import { PlayScreen } from "./Components/PlayScreen/PlayScreen";
import Canvas from "./Components/Canvas/Canvas";
function App() {
  const { level, words, setWords, isActiveTab } = useStore(LevelsStore);
  const { usersWords } = useStore(EnterStore);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    setWords();
    localStorage.setItem("progress", level);
  }, [level, setWords]);

  useEffect(() => {
    setIsWin(words.length === usersWords.length);
  }, [setIsWin, usersWords.length, words.length]);

  return (
    <>
      {isActiveTab && !isWin && <Canvas className={styles.canvas} />}
      <div className={styles.mainContainer} id="mainContainer">
        {!isActiveTab && <Modal />}
        {isWin ? <WinScreen /> : <PlayScreen />}
      </div>
    </>
  );
}

export default App;
