import React, {FC} from 'react'

type CategoriesProps = {
  value: number,
  onClickCategory: (id: number) => void,
}

const Categories: FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((list, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : null}>{categories[i]}</li>
        ))}
      </ul>
    </div>
  )
})

export default Categories