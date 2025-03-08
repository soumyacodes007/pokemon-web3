import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import PokemonCard from '../cards/PokemonCard';
import './BattleField.css';

const BattleField = () => {
  const { battleState, playCard, endTurn } = useGame();
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [battleLog, setBattleLog] = useState([]);

  useEffect(() => {
    if (battleState) {
      // Add initial battle log entry
      setBattleLog([
        { 
          message: `Battle started against ${battleState.opponent.name}!`,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [battleState]);

  if (!battleState) {
    return <div className="battle-loading">Loading battle...</div>;
  }

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handlePositionSelect = (position) => {
    if (selectedCard) {
      playCard(selectedCard.id, position);
      
      // Add to battle log
      setBattleLog([
        ...battleLog,
        {
          message: `You played ${selectedCard.name} in position ${position}`,
          timestamp: new Date().toISOString()
        }
      ]);
      
      setSelectedCard(null);
      setSelectedPosition(null);
    }
  };

  const handleEndTurn = () => {
    endTurn();
    
    // Add to battle log
    setBattleLog([
      ...battleLog,
      {
        message: `You ended your turn. It's now ${battleState.turn === 'player' ? 'opponent' : 'your'} turn.`,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <div className="battle-field">
      <div className="battle-header">
        <div className="opponent-info">
          <img src={battleState.opponent.avatar} alt="Opponent" className="avatar" />
          <div className="player-details">
            <h3>{battleState.opponent.name}</h3>
            <div className="energy-counter">
              Energy: {battleState.opponentEnergy || 0}
            </div>
          </div>
        </div>
        
        <div className="battle-status">
          <div className="round-indicator">Round {battleState.round}</div>
          <div className={`turn-indicator ${battleState.turn}`}>
            {battleState.turn === 'player' ? 'Your Turn' : 'Opponent\'s Turn'}
          </div>
        </div>
      </div>
      
      <div className="battle-arena">
        <div className="opponent-field">
          {Array(5).fill(null).map((_, index) => (
            <div key={`opponent-${index}`} className="field-position">
              {battleState.opponentField[index] ? (
                <PokemonCard card={battleState.opponentField[index]} />
              ) : (
                <div className="empty-position"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="player-field">
          {Array(5).fill(null).map((_, index) => (
            <div 
              key={`player-${index}`} 
              className={`field-position ${selectedPosition === index ? 'selected' : ''}`}
              onClick={() => handlePositionSelect(index)}
            >
              {battleState.playerField[index] ? (
                <PokemonCard card={battleState.playerField[index]} />
              ) : (
                <div className="empty-position"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="player-hand">
        <AnimatePresence>
          {battleState.playerHand.map((card, index) => (
            <motion.div 
              key={`hand-${card.id}-${index}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`hand-card ${selectedCard?.id === card.id ? 'selected' : ''}`}
              onClick={() => handleCardSelect(card)}
            >
              <PokemonCard card={card} isPlayable={battleState.turn === 'player'} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="battle-controls">
        <button 
          className="end-turn-btn"
          onClick={handleEndTurn}
          disabled={battleState.turn !== 'player'}
        >
          End Turn
        </button>
        
        <div className="battle-log">
          <h4>Battle Log</h4>
          <div className="log-entries">
            {battleLog.map((entry, index) => (
              <div key={index} className="log-entry">
                <span className="log-time">
                  {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="log-message">{entry.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleField; 