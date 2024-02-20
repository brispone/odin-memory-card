import { useState } from 'react'
import './styles/App.css'
import Scoreboard from './components/Scoreboard';

function App() {

  const [ currentScore, setCurrentScore ] = useState(0);
  const [ bestScore, setBestScore ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);

  const randomNumber = Math.ceil(Math.random() * 731);

  function increaseScore() {
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  }

  return (
    <>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <button onClick={increaseScore}>Score a point!</button>
    </>
  )
}

export default App