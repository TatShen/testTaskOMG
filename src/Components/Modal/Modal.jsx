import ribbon from "/ribbon.svg";
import cancel from "/cancel.svg";
import styles from "./Modal.module.scss";
export const Modal = () => {
  return (
    <div className={styles.mask}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.ribbon}>
            <img src={ribbon} alt="ribbon"></img>
            <p>Две вкладки <br/>с игрой?</p>
          </div>
          <button className={styles.cancel} onClick={() => location.reload()}>
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
