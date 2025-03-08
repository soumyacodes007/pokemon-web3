import { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { useWallet } from '../contexts/WalletContext';
import MarketplaceListing from '../components/marketplace/MarketplaceListing';
import './Marketplace.css';

const Marketplace = () => {
  const { marketplace, dispatch, loadMarketplace } = useGame();
  const { isConnected, connectWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketplace = async () => {
      setIsLoading(true);
      try {
        await loadMarketplace();
      } catch (error) {
        console.error('Error loading marketplace:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketplace();
  }, [loadMarketplace]);

  return (
    <div className="marketplace-page">
      {/* Render your component content here */}
    </div>
  );
};

export default Marketplace; 