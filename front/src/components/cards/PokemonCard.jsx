import { useState } from 'react';
import { motion } from 'framer-motion';
import './PokemonCard.css';

const PokemonCard = ({ card, onClick, isPlayable = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClick = () => {
    if (onClick) onClick(card);
  };

  return (
    <motion.div 
      className={`pokemon-card ${isPlayable ? 'playable' : ''}`}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      onDoubleClick={handleFlip}
    >
      <motion.div 
        className="card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-front">
          <div className={`card-header ${card.type.toLowerCase()}`}>
            <h3 className="card-name">{card.name}</h3>
            <div className="card-hp">HP {card.hp}</div>
          </div>
          <div className="card-image-container">
            <img src={card.imageUrl} alt={card.name} className="card-image" />
          </div>
          <div className="card-type">{card.type}</div>
          <div className="card-attacks">
            {card.attacks.map((attack, index) => (
              <div key={index} className="card-attack">
                <span className="attack-name">{attack.name}</span>
                <span className="attack-damage">{attack.damage}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-back">
          <div className="card-description">
            <p>{card.description}</p>
          </div>
          <div className="card-stats">
            <div className="stat">
              <span className="stat-label">Rarity:</span>
              <span className="stat-value">{card.rarity}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Set:</span>
              <span className="stat-value">{card.set}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Artist:</span>
              <span className="stat-value">{card.artist}</span>
            </div>
          </div>
          {card.tokenId && (
            <div className="card-token-info">
              <span className="token-label">Token ID:</span>
              <span className="token-value">{card.tokenId}</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PokemonCard; 