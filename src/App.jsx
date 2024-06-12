import { useState } from 'react'
import styles from './App.module.scss'
import { WordsBlock } from './Components/WordsBlock/WordsBlock'
import { LettersBlock } from './Components/LettersBlock/LettersBlock'
import { Enter } from './Components/Enter/Enter'
import EnterStore from './Store/EnterStore'
import { Modal } from './Components/Modal/Modal'


function App() {
  const [level, setLevel] = useState(1)

 

  return (
    <div className={styles.mainContainer}>
    <Modal/>
      <h1>Уровень {level}</h1>
      <WordsBlock/>
      <Enter/>
      <LettersBlock/>
    </div>
  )
}

export default App
