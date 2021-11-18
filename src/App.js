import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
const cardImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"}
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  // shuffle cards
  const shuffleCards = () => {
    const cards = [...cardImages, ...cardImages].sort(() =>
    Math.random() - 0.5).map((card) => ({...card, id: Math.random()}));
    setCards(cards);
    setTurns(0);
  }
  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card): setChoiceOne(card);
  }
  // compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo)  {
      if(choiceOne.src === choiceTwo.src) {
        console.log("those cards match");
        resetTurn();
      } else {
        console.log("those cards do not match");
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);
   // reset choice and increase turns 
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick  = {shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          // <div key = {card.id}>
          //   <img  className = "front" src={card.src} alt="card-front" />
          //   <img  className = "back" src= "/img/cover.png" alt="card-back" />
          // </div>
          <SingleCard key = {card.id} card = {card} handleChoice = {handleChoice} />
        ))}
      </div>
    </div> 
  );
}

export default App;
