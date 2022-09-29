import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../../utils/calcTotalPrice'
import { getCartFromLS } from '../../../utils/getCartFromLS'
import { RootState } from '../../store'
import { CartItem, CartSliceState } from './types'

const { totalPrice, items} = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({...action.payload, count: 1})
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: any) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
      state.items = state.items.filter(item => item.count !== 0)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count
      }, 0)
    },
    removeItem(state, action: any) {
      state.totalPrice -= action.payload.sum
      state.items = state.items.filter(obj => obj.id !== action.payload.id)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    }
  },
})

export const cartSelector = (state: RootState) => state.cart
export const cartItemSelectorById = (id: number) => (state: RootState) => state.cart.items.find(obj => obj.id === id)
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer