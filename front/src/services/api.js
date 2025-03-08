import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.pokeweb3.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User related API calls
export const fetchUserData = async (walletAddress) => {
  try {
    const response = await api.get(`/users/${walletAddress}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserProfile = async (walletAddress, userData) => {
  try {
    const response = await api.put(`/users/${walletAddress}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Card related API calls
export const fetchUserCards = async (walletAddress) => {
  try {
    const response = await api.get(`/users/${walletAddress}/cards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user cards:', error);
    throw error;
  }
};

export const fetchCardDetails = async (cardId) => {
  try {
    const response = await api.get(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching card details:', error);
    throw error;
  }
};

// Deck related API calls
export const fetchUserDecks = async (walletAddress) => {
  try {
    const response = await api.get(`/users/${walletAddress}/decks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user decks:', error);
    throw error;
  }
};

export const createDeck = async (walletAddress, deckData) => {
  try {
    const response = await api.post(`/users/${walletAddress}/decks`, deckData);
    return response.data;
  } catch (error) {
    console.error('Error creating deck:', error);
    throw error;
  }
};

export const updateDeck = async (walletAddress, deckId, deckData) => {
  try {
    const response = await api.put(`/users/${walletAddress}/decks/${deckId}`, deckData);
    return response.data;
  } catch (error) {
    console.error('Error updating deck:', error);
    throw error;
  }
};

export const deleteDeck = async (walletAddress, deckId) => {
  try {
    const response = await api.delete(`/users/${walletAddress}/decks/${deckId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting deck:', error);
    throw error;
  }
};

// Battle related API calls
export const fetchOpponents = async () => {
  try {
    const response = await api.get('/battle/opponents');
    return response.data;
  } catch (error) {
    console.error('Error fetching opponents:', error);
    throw error;
  }
};

export const startBattle = async (walletAddress, opponentId, deckId) => {
  try {
    const response = await api.post('/battle/start', {
      walletAddress,
      opponentId,
      deckId
    });
    return response.data;
  } catch (error) {
    console.error('Error starting battle:', error);
    throw error;
  }
};

export const playCard = async (battleId, cardId, position) => {
  try {
    const response = await api.post(`/battle/${battleId}/play`, {
      cardId,
      position
    });
    return response.data;
  } catch (error) {
    console.error('Error playing card:', error);
    throw error;
  }
};

export const endTurn = async (battleId) => {
  try {
    const response = await api.post(`/battle/${battleId}/end-turn`);
    return response.data;
  } catch (error) {
    console.error('Error ending turn:', error);
    throw error;
  }
};

export const fetchBattleHistory = async (walletAddress) => {
  try {
    const response = await api.get(`/users/${walletAddress}/battles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching battle history:', error);
    throw error;
  }
};

// Marketplace related API calls
export const fetchMarketplaceListings = async (filters = {}) => {
  try {
    const response = await api.get('/marketplace/listings', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching marketplace listings:', error);
    throw error;
  }
};

export const createListing = async (walletAddress, listingData) => {
  try {
    const response = await api.post('/marketplace/listings', {
      seller: walletAddress,
      ...listingData
    });
    return response.data;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

export const purchaseListing = async (walletAddress, listingId) => {
  try {
    const response = await api.post(`/marketplace/listings/${listingId}/purchase`, {
      buyer: walletAddress
    });
    return response.data;
  } catch (error) {
    console.error('Error purchasing listing:', error);
    throw error;
  }
};

export default api; 