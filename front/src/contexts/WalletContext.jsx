import { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        const { chainId } = await provider.getNetwork();
        
        setAccount(accounts[0]);
        setProvider(provider);
        setSigner(signer);
        setIsConnected(true);
        setChainId(chainId);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
    setChainId(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ 
      account, 
      provider, 
      signer, 
      isConnected, 
      chainId, 
      connectWallet, 
      disconnectWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
}; 