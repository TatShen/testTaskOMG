import { useEffect, useState, useRef } from "react";

import styles from "./WordsBlock.module.scss";
import LevelsStore from "../../Store/LevelsStore";
import { Letter } from "../Letter/Letter";
import { useStore } from "zustand";
import EnterStore from "../../Store/EnterStore";

export const WordsBlock = () => {
  const [words, setWords] = useState([]);
  const { usersWords } = useStore(EnterStore);
  const wordsBlockRef = useRef(null);
  const [shouldScrollToFirstWord, setShouldScrollToFirstWord] = useState(false);
  const wordsBlockElement = wordsBlockRef.current;
  const [usersScroll, setUsersScroll] = useState(false);

  useEffect(() => {
    setWords(LevelsStore.getState().words);
  }, [words]);

  useEffect(() => {
    if (!wordsBlockElement) return;
    const wordElements = wordsBlockElement.querySelectorAll(`.${styles.word}`);
    const observer = new IntersectionObserver((entries) => {
      const allWordsVisible = Array.from(entries).every(
        (entry) => entry.isIntersecting
      );
      setShouldScrollToFirstWord(!allWordsVisible);
    });
    wordElements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [words, usersWords, wordsBlockElement]);

  useEffect(() => {
    if (shouldScrollToFirstWord && wordsBlockElement && !usersScroll) {
      const firstWordElement = wordsBlockElement.querySelector(
        `.${styles.word}`
      );
      if (firstWordElement) {
        wordsBlockElement.scrollTo({
          top: firstWordElement.offsetTop - wordsBlockElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [shouldScrollToFirstWord, usersScroll, wordsBlockElement]);

  return (
    <div
      className={styles.wordsBlock}
      ref={wordsBlockRef}
      onScroll={() => setUsersScroll(true)}
    >
      {words.map((word, index) => (
        <div
          className={usersWords.includes(word) ? styles.rightWord : styles.word}
          key={index}
        >
          {word.split("").map((letter, i) => (
            <Letter
              key={i}
              className={
                usersWords.includes(word)
                  ? styles.rightLetter
                  : styles.emptyLetter
              }
              letter={letter}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
