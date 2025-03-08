import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import { useUser } from '../../contexts/UserContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { isConnected, account, connectWallet, disconnectWallet } = useWallet();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Pokémon Web3" className="logo-image" />
          <span className="logo-text">PokéWeb3</span>
        </Link>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`}></span>
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/collection" 
              className={`nav-link ${location.pathname === '/collection' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Collection
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/decks" 
              className={`nav-link ${location.pathname === '/decks' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Decks
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/battle" 
              className={`nav-link ${location.pathname === '/battle' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Battle
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/marketplace" 
              className={`nav-link ${location.pathname === '/marketplace' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
          </li>
        </ul>

        <div className="wallet-section">
          {isConnected ? (
            <div className="wallet-connected">
              <div className="wallet-address">
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </div>
              <div className="wallet-dropdown">
                <Link to="/profile" className="profile-link">
                  <div className="profile-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" />
                    ) : (
                      <div className="avatar-placeholder">
                        {user?.username?.charAt(0) || account?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="dropdown-content">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button className="dropdown-item disconnect-btn" onClick={disconnectWallet}>
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button className="connect-wallet-btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 