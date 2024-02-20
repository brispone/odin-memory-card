import { useState, useEffect } from 'react'
import './styles/App.css'
import Scoreboard from './components/Scoreboard';
import Banner from './components/Banner';
import Card from './components/Card';
import Loading from './components/Loading';

function App() {

  const [ currentScore, setCurrentScore ] = useState(0);
  const [ bestScore, setBestScore ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ cards, setCards ] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  function generateRandom() {
    const randomNumber = Math.ceil(Math.random() * 731);
    return randomNumber;

  }

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/${apiKey}/${generateRandom()}`);
        const result = await response.json();
        setCards(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  function increaseScore() {
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  }

  console.log(cards);

  return (
    <>
      <div className="top-bar">
        <Banner />
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      </div>
      <div className="gameboard">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {cards && <Card card={cards} />}
            {cards && <Card card={cards} />}
          </>
        )}
      </div>
    </>
  )
}

export default App