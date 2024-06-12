import  { useEffect, useState } from "react";


import styles from './WordsBlock.module.scss'
import LevelsStore from "../../Store/LevelsStore";
import { Letter } from "../Letter/Letter";

export const WordsBlock = () => {
    const [words, setWords] = useState([])
    useEffect(() => {
       setWords (LevelsStore.getState().firstLevel)
    }, [])

    return <div className={styles.lettersBlock}>
        {words.map((word, index) => (
                <div key={index}>
                    <div className={styles.word}>
                        {word.split('').map((letter, i) => (
                           <Letter key={i} className={styles.emptyLetter}/>
                        ))}
                    </div>
                </div>
            ))}
        
    </div>
}