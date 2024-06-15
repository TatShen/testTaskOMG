
import { useStore } from "zustand";
import LevelsStore from "../../Store/LevelsStore";
import EnterStore from "../../Store/EnterStore";
import styles from './WinScreen.module.scss'

export const WinScreen = () => {
    const {level, setLevel, setWords} = useStore(LevelsStore)
    const { clearUsersWords} = useStore(EnterStore)
    const getNextLevel = () => {
        setLevel();
        setWords();
        clearUsersWords();
      };

  return <div className={styles.win}>
    <p>Уровень {level} пройден</p>
    <h2>Изумительно!</h2>
    <button className={styles.next} onClick={getNextLevel}>
      Уровень {Number(level) + 1}
    </button>
  </div>;
};

