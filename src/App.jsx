import { useEffect, useState } from 'react';
import ancientFruit from "./assets/Ancient_Fruit.png";
import blueberry from "./assets/Blueberry.png";
import cranberries from "./assets/Cranberries.png";
import grape from "./assets/Grape.png";
import melon from "./assets/Melon.png";
import pineapple from "./assets/Pineapple.png";
import starfruit from "./assets/Starfruit.png";
import strawberry from "./assets/Strawberry.png";
import cardBack from "./assets/Main_Logo.png";
import './App.css';

const cardImages = [
  { src: ancientFruit, matched: false },
  { src: blueberry, matched: false },
  { src: cranberries, matched: false },
  { src: grape, matched: false },
  { src: melon, matched: false },
  { src: pineapple, matched: false },
  { src: starfruit, matched: false },
  { src: strawberry, matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [turns, setTurns] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleCardFlip = () => setIsCardFlipped(!isCardFlipped);

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(0);
  };

  const handleNewGame = () => {
    setGameFinished(false);
    setMatchedCount(0);
    setDisabled(false);
    setFirstChoice(null);
    setSecondChoice(null);
    shuffleCards();
  };

  const handleChoice = (card) => {
    if (!disabled && card !== firstChoice && !card.matched) {
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.src === firstChoice.src ? { ...card, matched: true } : card
          )
        );
        setMatchedCount(prev => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
      setTurns(prev => prev + 1);
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (matchedCount === cardImages.length) {
      setGameFinished(true);
    }
  }, [matchedCount]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="app">
      <button className="new-game-button" onClick={handleNewGame}>
        New Game
      </button>
      <div className="game-container">
        <div className={`game-container-inner ${gameFinished ? 'flipped' : ''}`}>
          <div className="game-container-front">
            <div className="card-grid">
              {cards.map(card => {
                const isFlipped = card === firstChoice || card === secondChoice || card.matched;

                return (
                  <div key={card.id} className="card-container">
                    <div className={`card-container-inner ${isFlipped ? 'flipped' : ''}`}>
                      <div className="card-front">
                        <img src={card.src} alt="front" />
                      </div>
                      <div className="card-back" onClick={() => handleChoice(card)}>
                        <img src={cardBack} alt="back" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="game-container-back">
            <h2>Congratulations!</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
