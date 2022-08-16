import React from 'react'

function Categories(props) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {categories.map((list, i) => (
          <li key={i} onClick={() => setActiveIndex(i)} className={activeIndex === i ? 'active' : null}>{categories[i]}</li>
        ))}
      </ul>
    </div>
  )
}

export default Categories