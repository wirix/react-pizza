import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type Pizza = {
  id: number,
  title: string,
  imageUrl: string,
  types: number[],
  sizes: number[],
  price: number,
  rating: number,
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface pizzaSliceState {
  items: Pizza[];
  status: Status
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
  let { getCategoryId, getRegime, order, getSearchValue, currentPage } = params
  const { data } = await axios.get<Pizza[]>(`https://62fb49efe4bcaf535180e06c.mockapi.io/items?${getCategoryId}&sortBy=${getRegime}&order=${order}&search=${getSearchValue}&limit=4&page=${currentPage}`)

  return data
})

const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING // loading | success | error
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = []
      state.status = Status.LOADING
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = []
      state.status = Status.ERROR
    })
  }
})

export const pizzaDataSelector = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer