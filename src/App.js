import './App.css'
import Categories from './components/Categories/Categories'
import Header from './components/Header/Header'
import PizzaBlock from './components/PizzaBlock/PizzaBlock'
import Sort from './components/Sort/Sort'
import './scss/app.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Skeleton from './components/PizzaBlock/Skeleton'

function App(props) {
  const [items, setItems] = useState([])
  // const [itemsSkeleton, setItemsSkeleton] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [isLoaderPizza, setIsLoaderPizza] = useState(true)

  useEffect(() => {
    axios.get(`https://62fb49efe4bcaf535180e06c.mockapi.io/items`)
    .then(response => {
      setItems(response.data)
      setIsLoaderPizza(false)
    })
  }, [])
  
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoaderPizza ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
                : items.map(i => (
                  <PizzaBlock {...i} key={i.id} />
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App