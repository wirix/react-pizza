import './App.css'
import Header from './components/Header/Header'
import './scss/app.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

function App(props) {
  const [items, setItems] = useState([])
  const [isLoaderPizza, setIsLoaderPizza] = useState(true)

  useEffect(() => {
    axios.get(`https://62fb49efe4bcaf535180e06c.mockapi.io/items`)
      .then(response => {
        setItems(response.data)
        setIsLoaderPizza(false)
      })
    window.scrollTo(0, 0, 0)
  }, [])

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path='/home' element={<Home isLoaderPizza={isLoaderPizza} items={items} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' element={<Navigate to={'/home'} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App