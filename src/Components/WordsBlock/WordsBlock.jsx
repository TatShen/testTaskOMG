import  { useEffect, useState } from "react";


import styles from './WordsBlock.module.scss'
import LevelsStore from "../../Store/LevelsStore";
import { Letter } from "../Letter/Letter";
import { useStore } from "zustand";
import EnterStore from "../../Store/EnterStore";

export const WordsBlock = () => {
    const [words, setWords] = useState([])
    const {usersWord} = useStore(EnterStore)
    useEffect(() => {
       setWords (LevelsStore.getState().firstLevel)
    }, [])


    return <div className={styles.lettersBlock}>
        {words.map((word, index) => (
                <div key={index}>
                    <div className={usersWord.includes(word) ? styles.rightWord : styles.word}>
                        {word.split('').map((letter, i) => (
                           <Letter key={i} className={styles.emptyLetter} letter={letter}/>
                        ))}
                    </div>
                </div>
            ))}
        
    </div>
}