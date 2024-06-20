const suits = ['♣','♠','❤️','♦️'];
const values = ['2', '3', '4', '5', '6', '7','8','9', '10', 'J', 'Q', 'K' ];

export const createDeck = () => {
    const deck = [];
    for(const suit of suits){
        for(const value of values){
            deck.push({suit, value});
        }
    }
    return deck;
};

export const getRandomCards = (deck, blankIndices, count = 5) => {
    const availableDeck = deck.filter((_, index)=>
        !blankIndices.includes(index));
    const shuffleDeck = [...availableDeck].sort(() => 0.5 - Math.random());
    const selectedCards = shuffleDeck.slice(0, count);
    return selectedCards;
};
