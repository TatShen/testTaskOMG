import ribbon from "/ribbon.svg";
import cancel from "/cancel.svg";
import styles from "./Modal.module.scss";
import { useStore } from "zustand";
import LevelsStore from "../../Store/LevelsStore";
import { useEffect, useState } from "react";
export const Modal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const {tabsId,isActiveTab, setIsActiveTab} = useStore(LevelsStore)

  
  useEffect(() => {
    setIsOpen(!isActiveTab)
  },[isActiveTab])

  const close = () => {
    localStorage.setItem("tabs", tabsId)
    setIsActiveTab(true);
  }
  
  return ( isOpen &&
    <div className={styles.mask}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.ribbon}>
            <img src={ribbon} alt="ribbon"></img>
            <p>Две вкладки <br/>с игрой?</p>
          </div>
          <button className={styles.cancel} onClick={close}>
            <img src={cancel} alt="cancel"></img>
          </button>
          <p>
            Похоже, игра открыта в нескольких вкладках браузера. Чтобы
            продолжить играть <br/>в этой вкладке, обновите страницу.
          </p>
          <button className={styles.update} onClick={() => location.reload()}>Обновить</button>
        </div>
      </div>
    </div> 
  );
};
