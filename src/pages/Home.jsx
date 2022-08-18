import axios from "axios";
import { useEffect, useState } from "react";
import Categories from "../components/Categories/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort/Sort";

function Home() {
  const [isLoaderPizza, setIsLoaderPizza] = useState(true)
  const [items, setItems] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [sortId, setSortId] = useState({name: 'популярности', sortProperty: 'rating'})

  useEffect(() => {
    setIsLoaderPizza(true)
    axios.get(`https://62fb49efe4bcaf535180e06c.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortId.sortProperty.replace('-', '')}&order=${sortId.sortProperty.includes('-') ? 'asc' : 'desc'}`)
      .then(response => {
        setItems(response.data)
        setIsLoaderPizza(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortId])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(catId) => setCategoryId(catId)} />
        <Sort value={sortId} onClickSort={(sortId) => setSortId(sortId)} />
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
  )
}

export default Home