import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const { isConnected, connectWallet } = useWallet();
  const { cards, decks, loadUserCards, loadUserDecks } = useGame();

  useEffect(() => {
    if (isConnected) {
      loadUserCards();
      loadUserDecks();
    }
  }, [isConnected, loadUserCards, loadUserDecks]);

  return (
    <div className="home-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Pokémon Web3 Card Game</h1>
        <p>Collect, trade, and battle with your Pokémon cards on the blockchain!</p>
        
        {!isConnected ? (
          <button className="connect-wallet-btn" onClick={connectWallet}>
            Connect Wallet to Start
          </button>
        ) : (
          <div className="action-buttons">
            <Link to="/battle" className="action-btn battle">
              Battle Now
            </Link>
            <Link to="/marketplace" className="action-btn marketplace">
              Explore Marketplace
            </Link>
          </div>
        )}
      </motion.div>
      
      {isConnected && (
        <div className="dashboard-preview">
          <div className="preview-section">
            <h2>Your Collection</h2>
            <div className="preview-content">
              {cards.length > 0 ? (
                <div className="cards-preview">
                  {cards.slice(0, 3).map(card => (
                    <div key={card.id} className="preview-card">
                      <img src={card.imageUrl} alt={card.name} />
                      <span>{card.name}</span>
                    </div>
                  ))}
                  <Link to="/collection" className="see-all-link">
                    See all {cards.length} cards
                  </Link>
                </div>
              ) : (
                <div className="empty-state">
                  <p>You don't have any cards yet.</p>
                  <Link to="/marketplace" className="action-link">
                    Get your first cards
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="preview-section">
            <h2>Your Decks</h2>
            <div className="preview-content">
              {decks.length > 0 ? (
                <div className="decks-preview">
                  {decks.slice(0, 2).map(deck => (
                    <div key={deck.id} className="preview-deck">
                      <h3>{deck.name}</h3>
                      <span>{deck.cards.length} cards</span>
                    </div>
                  ))}
                  <Link to="/decks" className="see-all-link">
                    Manage your decks
                  </Link>
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't created any decks yet.</p>
                  <Link to="/decks" className="action-link">
                    Create your first deck
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="features-section">
        <h2>Game Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🃏</div>
            <h3>Collect Rare Cards</h3>
            <p>Build your collection with unique Pokémon cards stored as NFTs on the blockchain.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚔️</div>
            <h3>Strategic Battles</h3>
            <p>Challenge other players to battles using your custom-built decks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💱</div>
            <h3>Trade & Marketplace</h3>
            <p>Buy, sell, and trade cards with other players in the marketplace.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Tournaments</h3>
            <p>Compete in tournaments to win exclusive rewards and climb the leaderboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 