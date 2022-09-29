import React, { useEffect, FC } from "react";
import { useSelector } from "react-redux";
import { Categories, Pagination, PizzaBlock, Skeleton, Sort } from '../components'
import { filterSelector, setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizzas, pizzaDataSelector } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from '../redux/store'

const Home: FC = () => {
  const { items, status } = useSelector(pizzaDataSelector)
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector)
  const dispatch = useAppDispatch()

  const getPizzas = async () => {
    const getCategoryId = categoryId > 0 ? `category=${categoryId}` : ''
    const getRegime = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const getSearchValue = searchValue ? searchValue : ''

    dispatch(
      fetchPizzas({
        getCategoryId,
        getRegime,
        order,
        getSearchValue,
        currentPage: String(currentPage)
      })
    )
  }

  useEffect(() => {
    getPizzas()
    window.scrollTo(0, 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, searchValue, currentPage])

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [dispatch])

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num))
  }

  const pizzas = items.map((i: any) => (<PizzaBlock {...i} key={i.id} />))
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error'
        ? <div className='error--content--info'>
          <div>Произошла ошибка 😕</div>
          <div>Не удалось получить пиццы. Попробуйте повторить попытку позже.</div>
        </div>
        : <div className="content__items">
            {status === 'loading' ? skeletons : pizzas}
        </div>
      }
      <Pagination onChangePage={onChangePage} />
    </div>
  )
}

export default Home