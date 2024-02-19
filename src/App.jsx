import { useState } from 'react'
import './styles/App.css'

function App() {

  const [ currentScore, setCurrentScore ] = useState(0);
  const [ bestScore, setBestScore ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);

  const randomNumber = Math.ceil(Math.random() * 731);

  return (
    <>

    </>
  )
}

export default App
