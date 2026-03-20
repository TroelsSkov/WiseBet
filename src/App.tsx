import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layouts/MainLayout'
import Coinflip from './pages/Coinflip'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='/' element={<Home />} />
          <Route path='/coinflip' element={<Coinflip />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
