import { useState } from 'react'
import styles from './App.module.scss'
import { WordsBlock } from './Components/WordsBlock/WordsBlock'

function App() {
  const [level, setLevel] = useState(1)

  return (
    <div className={styles.mainContainer}>
      <h1>Уровень {level}</h1>
      <WordsBlock/>
    </div>
  )
}

export default App
