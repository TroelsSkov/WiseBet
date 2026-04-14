import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './layouts/MainLayout'
import Coinflip from './pages/games/Coinflip'
import Blackjack from './pages/games/Blackjack'
import Roulette from './pages/games/Roulette'
import Signup from './pages/Signup'

function App() {
  return (
    <>
    <UserContext.Provider value={{ id: "ced1dba6-c044-48cf-a808-0738185ab394" }}> /*hardcoded for now*/
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Layout />} >
          <Route path='/' element={<Home />} />
          <Route path='/games/coinflip/:slug' element={<Coinflip />} />
          <Route path='/games/blackjack/:slug' element={<Blackjack />} />
          <Route path='/games/roulette/:slug' element={<Roulette />} />
        </Route>
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App;