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

  function generateRandomNumbers(count) {
    const numbers = new Set();
    while(numbers.size < count) {
      const randomNumber = Math.ceil(Math.random() * 731);
      numbers.add(randomNumber);
    }
    
    return Array.from(numbers);
  }

  const fetchCards = async() => {
    setIsLoading(true);
    const randomIds = generateRandomNumbers(5); // generate 5 unique IDs for pulling heros - number will later depend on game difficulty
    try {
      const cardPromises = randomIds.map(id =>
        fetch(`/api/${apiKey}/${id}`).then(response => response.json())
      );
       const cardResults = await Promise.all(cardPromises);
       setCards(cardResults);
     } catch (error) {
       console.error('Error fetching data:', error);
     } finally {
       setIsLoading(false);
    }
  };


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
        <div>
        <Banner />
        <button onClick={fetchCards}>New Cards</button>
        </div>
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      </div>
      <div className="gameboard">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {cards && cards.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default App