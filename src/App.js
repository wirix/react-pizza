import './App.css'
import Header from './components/Header/Header'
import './scss/app.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/slices/filterSlice'

export const SearchContext = React.createContext()

function App(props) {
  const [searchValue, setSearchValue] = useState('')

  const count = useSelector((state) => state.filter.value)
  const dispatch = useDispatch()

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' element={<Navigate to={'/home'} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        </SearchContext.Provider>
    </div>
  )
}

export default App