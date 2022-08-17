import Categories from "../components/Categories/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort/Sort";

function Home({ isLoaderPizza, items }) {
  return (
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
  )
}

export default Home