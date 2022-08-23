import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: null,
  isLoaderPizza: true,
  categoryId: 1,
  sort: { name: 'популярности (DESC)', sortProperty: 'rating' },
  searchValue: '',
  currentPage: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    }
  }
})

export const { setCategoryId } = filterSlice.actions

export default filterSlice