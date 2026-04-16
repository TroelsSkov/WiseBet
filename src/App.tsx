import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './layouts/MainLayout'
import Coinflip from './pages/games/Coinflip'
import Blackjack from './pages/games/Blackjack'
import Roulette from './pages/games/Roulette'
import Signup from './pages/Signup'
import { useEffect } from 'react'
import { useApi } from './services/useApi'

function App() {
  const location = useLocation();
  const excludedPaths = ["/login", "/signup"];
  const { error } = useApi<void>("/Api/Users/Auth");

  useEffect(() => {
    if (excludedPaths.includes(location.pathname)) {
      return;
    }

    if (error) {
      console.error("Session check failed:", error);
    }
  }, [location.pathname]);

  return (
    <>
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
    </>
  )
}

export default App
