import { useState } from 'react'
import styles from './App.module.scss'
import { WordsBlock } from './Components/WordsBlock/WordsBlock'
import { LettersBlock } from './Components/LettersBlock/LettersBlock'
import { Enter } from './Components/Enter/Enter'


function App() {
  const [level, setLevel] = useState(1)
  const [enter, setEnter] = useState([])

  return (
    <div className={styles.mainContainer}>
      <h1>Уровень {level}</h1>
      <WordsBlock/>
      <Enter letters={enter}/>
      <LettersBlock/>
    </div>
  )
}

export default App
