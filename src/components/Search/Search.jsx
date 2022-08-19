import React from 'react'
import styles from './Search.module.scss'

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <i className={`ri-search-2-line ${styles.searchIcon}`}></i>
      <input 
        placeholder='Поиск пиццы...'
        onChange={event => setSearchValue(event.target.value)}
        value={searchValue}
      />
      {searchValue && <i onClick={() => setSearchValue('')} className={`ri-close-line ${styles.cancelIcon}`}></i>}
    </div>
    
  )
}

export default Search