import { useCallback, useRef, useState, FC } from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/slices/filterSlice'
import { useDispatch } from "react-redux";

const Search: FC = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const deleteText = () => {
    inputRef.current.focus()
    dispatch(setSearchValue(''))
    setValue('')
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 400),
    []
  )

  const onChangeInput = (value: string) => {
    setValue(value)
    updateSearchValue(value)
  }

  return (
    <div className={styles.root}>
      <i className={`ri-search-2-line ${styles.searchIcon}`}></i>
      <input
        placeholder='Поиск пиццы...'
        onChange={event => onChangeInput(event.target.value)}
        value={value}
        ref={inputRef}
      />
      {value && <i onClick={() => deleteText()} className={`ri-close-line ${styles.cancelIcon}`}></i>}
    </div>
  )
}

export default Search