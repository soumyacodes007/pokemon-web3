import { createContext, useState, useContext, useEffect } from 'react';
import { useWallet } from './WalletContext';
import { fetchUserData } from '../services/api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { account, isConnected } = useWallet();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (isConnected && account) {
        setLoading(true);
        try {
          const userData = await fetchUserData(account);
          setUser(userData);
          setError(null);
        } catch (err) {
          console.error("Error loading user data:", err);
          setError("Failed to load user data");
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
      }
    };

    loadUserData();
  }, [account, isConnected]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}; 