import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './contexts/WalletContext'
import { GameProvider } from './contexts/GameContext'
import { UserProvider } from './contexts/UserContext'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import CardCollection from './pages/CardCollection'
import DeckManager from './pages/DeckManager'
import Marketplace from './pages/Marketplace'
import BattleArena from './pages/BattleArena'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <Router>
      <WalletProvider>
        <UserProvider>
          <GameProvider>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collection" element={<CardCollection />} />
                  <Route path="/decks" element={<DeckManager />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/battle" element={<BattleArena />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </GameProvider>
        </UserProvider>
      </WalletProvider>
    </Router>
  )
}

export default App
