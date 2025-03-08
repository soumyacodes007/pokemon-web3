import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import PokemonCard from '../cards/PokemonCard';
import './DeckBuilder.css';

const DeckBuilder = ({ onSave }) => {
  const { cards, decks } = useGame();
  const [selectedCards, setSelectedCards] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [availableCards, setAvailableCards] = useState([]);

  useEffect(() => {
    // Filter cards based on search and type filter
    let filtered = [...cards];
    
    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(card => 
        card.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }
    
    setAvailableCards(filtered);
  }, [cards, searchTerm, typeFilter]);

  const handleAddCard = (card) => {
    if (selectedCards.length < 60) {
      setSelectedCards([...selectedCards, card]);
    } else {
      alert('A deck can only contain 60 cards maximum');
    }
  };

  const handleRemoveCard = (index) => {
    const newSelectedCards = [...selectedCards];
    newSelectedCards.splice(index, 1);
    setSelectedCards(newSelectedCards);
  };

  const handleSaveDeck = () => {
    if (selectedCards.length < 20) {
      alert('A deck must contain at least 20 cards');
      return;
    }
    
    if (!deckName.trim()) {
      alert('Please enter a deck name');
      return;
    }
    
    const newDeck = {
      id: Date.now().toString(),
      name: deckName,
      cards: selectedCards,
      createdAt: new Date().toISOString()
    };
    
    onSave(newDeck);
  };

  return (
    <div className="deck-builder">
      <div className="deck-builder-header">
        <h2>Build Your Deck</h2>
        <div className="deck-info">
          <input
            type="text"
            placeholder="Deck Name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="deck-name-input"
          />
          <span className="card-count">{selectedCards.length}/60 cards</span>
        </div>
      </div>
      
      <div className="deck-builder-content">
        <div className="card-selection">
          <div className="card-filters">
            <input
              type="text"
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="type-filter"
            >
              <option value="all">All Types</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="psychic">Psychic</option>
              <option value="fighting">Fighting</option>
              <option value="darkness">Darkness</option>
              <option value="metal">Metal</option>
              <option value="dragon">Dragon</option>
              <option value="fairy">Fairy</option>
              <option value="colorless">Colorless</option>
            </select>
          </div>
          
          <div className="available-cards">
            {availableCards.map(card => (
              <div key={card.id} className="card-item" onClick={() => handleAddCard(card)}>
                <PokemonCard card={card} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="selected-deck">
          <h3>Selected Cards</h3>
          <div className="selected-cards">
            {selectedCards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="selected-card-item">
                <PokemonCard card={card} />
                <button 
                  className="remove-card-btn" 
                  onClick={() => handleRemoveCard(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <button 
            className="save-deck-btn"
            onClick={handleSaveDeck}
          >
            Save Deck
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckBuilder; 