import { useState } from 'react'
import styles from './App.module.scss'
import { LettersBlock } from './Components/LettersBlock/LettersBlock'

function App() {
  const [level, setLevel] = useState(1)

  return (
    <div className={styles.mainContainer}>
      <h1>Уровень {level}</h1>
      <LettersBlock/>
    </div>
  )
}

export default App
