import { createContext, useState, useContext, useReducer } from 'react';
import { useUser } from './UserContext';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const initialState = {
  cards: [],
  decks: [],
  activeDeck: null,
  battleState: null,
  marketplace: {
    listings: [],
    filter: 'all',
    sort: 'price-asc'
  }
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload };
    case 'SET_DECKS':
      return { ...state, decks: action.payload };
    case 'SET_ACTIVE_DECK':
      return { ...state, activeDeck: action.payload };
    case 'START_BATTLE':
      return { ...state, battleState: action.payload };
    case 'UPDATE_BATTLE':
      return { ...state, battleState: { ...state.battleState, ...action.payload } };
    case 'END_BATTLE':
      return { ...state, battleState: null };
    case 'SET_MARKETPLACE_LISTINGS':
      return { ...state, marketplace: { ...state.marketplace, listings: action.payload } };
    case 'SET_MARKETPLACE_FILTER':
      return { ...state, marketplace: { ...state.marketplace, filter: action.payload } };
    case 'SET_MARKETPLACE_SORT':
      return { ...state, marketplace: { ...state.marketplace, sort: action.payload } };
    default:
      return state;
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { user } = useUser();

  // Game actions
  const loadUserCards = async () => {
    // Implementation to load cards from API
    // dispatch({ type: 'SET_CARDS', payload: cardsData });
  };

  const loadUserDecks = async () => {
    // Implementation to load decks from API
    // dispatch({ type: 'SET_DECKS', payload: decksData });
  };

  const createDeck = async (deckData) => {
    // Implementation to create a new deck
  };

  const startBattle = (opponent) => {
    // Implementation to start a battle
    dispatch({ 
      type: 'START_BATTLE', 
      payload: {
        opponent,
        playerHand: [],
        opponentHand: [],
        playerField: [],
        opponentField: [],
        turn: 'player',
        round: 1
      }
    });
  };

  const playCard = (cardId, position) => {
    // Implementation to play a card in battle
  };

  const endTurn = () => {
    // Implementation to end turn in battle
  };

  const loadMarketplace = async () => {
    // Implementation to load marketplace listings
  };

  return (
    <GameContext.Provider value={{ 
      ...state,
      loadUserCards,
      loadUserDecks,
      createDeck,
      startBattle,
      playCard,
      endTurn,
      loadMarketplace,
      dispatch
    }}>
      {children}
    </GameContext.Provider>
  );
}; 