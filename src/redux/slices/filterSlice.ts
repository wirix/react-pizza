import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  currentPage: number;
  searchValue: string;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  currentPage: 1,
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    }
  },
})

export const filterSelector = (state: RootState) => state.filter
export const sortSelector = (state: RootState) => state.filter.sort

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer