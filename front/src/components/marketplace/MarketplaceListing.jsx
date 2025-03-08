import { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import PokemonCard from '../cards/PokemonCard';
import './MarketplaceListing.css';

const MarketplaceListing = ({ listing, onPurchase }) => {
  const { isConnected, account } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to make a purchase');
      return;
    }
    
    setIsProcessing(true);
    try {
      await onPurchase(listing.id);
      alert(`Successfully purchased ${listing.card.name}!`);
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Failed to complete purchase. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isOwner = isConnected && account && listing.seller.toLowerCase() === account.toLowerCase();

  return (
    <div className="marketplace-listing">
      <div className="listing-card">
        <PokemonCard card={listing.card} />
      </div>
      
      <div className="listing-details">
        <h3 className="listing-title">{listing.card.name}</h3>
        
        <div className="listing-price">
          <span className="price-label">Price:</span>
          <span className="price-value">{listing.price} ETH</span>
        </div>
        
        <div className="listing-seller">
          <span className="seller-label">Seller:</span>
          <span className="seller-address">
            {listing.sellerName || `${listing.seller.substring(0, 6)}...${listing.seller.substring(listing.seller.length - 4)}`}
          </span>
        </div>
        
        <div className="listing-date">
          Listed on {new Date(listing.listedAt).toLocaleDateString()}
        </div>
        
        {listing.rarity && (
          <div className="listing-rarity">
            <span className="rarity-label">Rarity:</span>
            <span className={`rarity-value ${listing.rarity.toLowerCase()}`}>
              {listing.rarity}
            </span>
          </div>
        )}
        
        {!isOwner ? (
          <button 
            className="purchase-btn"
            onClick={handlePurchase}
            disabled={isProcessing || isOwner}
          >
            {isProcessing ? 'Processing...' : 'Purchase'}
          </button>
        ) : (
          <div className="owner-notice">This is your listing</div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceListing; 