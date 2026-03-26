import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layouts/MainLayout'
import Coinflip from './pages/games/Coinflip'
import Blackjack from './pages/games/Blackjack'
import Roulette from './pages/games/Roulette'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='/' element={<Home />} />
          <Route path='/games/coinflip/:slug' element={<Coinflip />} />
          <Route path='/games/blackjack/:slug' element={<Blackjack />} />
          <Route path='/games/roulette/:slug' element={<Roulette />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;