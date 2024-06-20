import React, { useState } from 'react';
import { createDeck, getRandomCards} from './deck';
import './App.css';
 
function App() {
  const [deck, setDeck] = useState(createDeck())
  const [cards, setCards] = useState([])
  const [blankIndices, setBlankIndices] = useState([]);
  const [noMoreCards, setNoMorecards] = useState(false);

    const handleCardClick = (index) =>{
      const clickedCard = cards[index];
      const clickedCardIndex = deck.indexOf(clickedCard);
      const newBlankIndices = blankIndices.filter(idx => idx !== clickedCardIndex);
      const newCards = [...cards];
      newCards[index] = {suit: '', value: ''};
      setCards(newCards);
      setBlankIndices(newBlankIndices);
      
      const availableDeck = deck.filter((_, index) => !blankIndices.includes(index));
      if(availableDeck.length> 0 ){
        setNoMorecards(false);
        
      }
    };

    
    const addRandomCards = () => {
      const availableDeck = deck.filter((_, index) => 
      !blankIndices.includes(index));
      if(availableDeck.length === 0 ){
        setNoMorecards(true);
        return;
      }
      const cardsToDraw = Math.min(5, availableDeck.length);
      const newCards = getRandomCards(deck, blankIndices, cardsToDraw);
      const newBlankIndices = [...blankIndices, ...newCards.map(card => deck.indexOf(card))];
      setCards([...cards, ...newCards]);
      setBlankIndices(newBlankIndices);
      if(availableDeck.length - cardsToDraw === 0){
        setNoMorecards(true);
      }
    }

    return (
        <div className= "App">
          <div className="draw">
          {noMoreCards?(
            <div className='no-more-cards'> No more Cards left</div>
          ):(
            <button onClick={addRandomCards} className='draw'> Draw Cards</button>
          )}  
          </div>

          <div className="cards">
          {cards.map((card, index) => (
            <div key={index} className='card' onClick = { () => 
              handleCardClick(index)}>
            {card.value} {card.suit ? ` ${card.suit}` : ''}
            </div>
          ))}
          </div>


        </div>
    );
}
 
export default App;