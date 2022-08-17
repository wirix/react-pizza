import './App.css'
import Header from './components/Header/Header'
import './scss/app.scss'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

function App(props) {

  return (
    <HashRouter>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' element={<Navigate to={'/home'} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default App