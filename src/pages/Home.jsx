import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import Categories from "../components/Categories/Categories";
import Pagination from "../components/Pagination/Pagination";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort/Sort";
import { useSelector, useDispatch } from 'react-redux'

function Home() {
  const [isLoaderPizza, setIsLoaderPizza] = useState(true)
  const [items, setItems] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortId, setSortId] = useState({ name: 'популярности (DESC)', sortProperty: 'rating'})
  const { searchValue } = useContext(SearchContext)
  // const setCategoryId = () => {}

  // const categoryId = useSelector((state) => state.filter.categoryId)
  // console.log(categoryId)

  useEffect(() => {
    setIsLoaderPizza(true)
    axios.get(`https://62fb49efe4bcaf535180e06c.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortId.sortProperty.replace('-', '')}&order=${sortId.sortProperty.includes('-') ? 'asc' : 'desc'}&search=${searchValue ? searchValue : ''}&limit=4&page=${currentPage}`)
      .then(response => {
        setItems(response.data)
        setIsLoaderPizza(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortId, searchValue, currentPage])

  const pizzas = items.map(i => (<PizzaBlock {...i} key={i.id} />))
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(catId) => setCategoryId(catId)} />
        <Sort value={sortId} onClickSort={(sortId) => setSortId(sortId)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaderPizza ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default Home