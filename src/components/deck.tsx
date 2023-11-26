import React, { useState } from 'react';

const Deck = () => {
  const [showDeck, setShowDeck] = useState(false);

  const toggleDeck = () => {
    setShowDeck(!showDeck);
  };

  const deckStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'blue',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    zIndex: '999',
    width: showDeck ? '65%' : 0,  // Set width to 65% when deck is shown, 0 otherwise
    height: showDeck ? '65%' : 0, // Set height to 65% when deck is shown, 0 otherwise
    transition: 'width 0.5s, height 0.5s', // Add transition for a smooth effect
  };

  return (
    <div>
      <button onClick={toggleDeck}>Toggle Deck</button>
      {showDeck && (
        <div style={deckStyle}>
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              fontSize: '20px',
            }}
            onClick={toggleDeck}
          >
            &times;
          </span>
          <p>This is the content of the deck.</p>
        </div>
      )}
    </div>
  );
};

export default Deck;
