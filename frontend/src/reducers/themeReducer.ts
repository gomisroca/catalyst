import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface CounterState {
  value: string
}

// Define the initial state using that type
const initialState: CounterState = {
  value: localStorage.getItem('theme') || 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setTheme  } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const theme = (state: RootState) => state.theme.value

export default themeSlice.reducer