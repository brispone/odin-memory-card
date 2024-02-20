import { useState, useEffect } from 'react'
import './styles/App.css'
import Scoreboard from './components/Scoreboard';
import Banner from './components/Banner';
import Card from './components/Card';
import Loading from './components/Loading';

function App() {

  const [ currentScore, setCurrentScore ] = useState(0);
  const [ bestScore, setBestScore ] = useState(0);
  const [ gameRunning,setGameRunning ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ cards, setCards ] = useState(null);
  const [ clickedCards, setClickedCards ] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  function generateRandomNumbers(count) {
    const numbers = new Set();
    while(numbers.size < count) {
      const randomNumber = Math.ceil(Math.random() * 731);
      numbers.add(randomNumber);
    }
    
    return Array.from(numbers);
  }

  function shuffleCards() {
    let array = [...cards];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    setCards(array);
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
       setGameRunning(true);
    }
  };


  function increaseScore() {
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  }

  function clickCard(card) {
    // Check if the card was already clicked
    const alreadyClicked = clickedCards.some(clicked => clicked.name === card.name);
  
    if (alreadyClicked) {
      alert("Game over!");
      endGame();
      // Optionally reset clickedCards here if needed
      // setClickedCards([]);
      return; // Exit the function to prevent further execution
    }
  
    // Proceed if the game is still running and the card wasn't clicked before
    if (gameRunning) {
      setClickedCards(prevCards => [...prevCards, card]); // Update clicked cards
      increaseScore(); // Increase score
      shuffleCards(); // Shuffle cards

      if (currentScore + 1 === cards.length) {
        alert("You win!");
        endGame();
      }

    }
  }

  function endGame() {
    setGameRunning(false);
    setCurrentScore(0);
  }
  

  console.log(cards);

  return (
    <>
      <div className="top-bar">
        <div>
        <Banner />
        <button onClick={fetchCards}>New Cards</button>
        <button onClick={shuffleCards}>Shuffle</button>
        </div>
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      </div>
      <div className="gameboard">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {gameRunning && cards.map((card, index) => (
              <Card key={index} card={card} onClick={clickCard}/>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default App