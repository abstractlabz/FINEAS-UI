// Deck.tsx
import React from 'react';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

interface DeckProps {
  isVisible: boolean;
  onClose: () => void;
}

const Deck: React.FC<DeckProps> = ({ isVisible, onClose }) => {
  const deckStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#41447c',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    zIndex: '999',
    width: isVisible ? '65%' : 0,
    height: isVisible ? '65%' : 0,
    transition: 'width 0.5s, height 0.5s',
  };

  return (
    <div>
      {isVisible && (
        <div style={deckStyle}>
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              fontSize: '20px',
            }}
            onClick={onClose}
          >
            &times;
          </span>
          <Tabs aria-label="Options">
            <Tab key="photos" title="Company Summary">
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="music" title="Financials Summary">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title="Stock Analysis">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Deck;
