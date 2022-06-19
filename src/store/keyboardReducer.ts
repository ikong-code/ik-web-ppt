import { createSlice } from '@reduxjs/toolkit'
import { KeyboardState } from './types' 
export const keyboardReducer = createSlice({
  name: 'keyboard',
  initialState: {
    ctrlKeyState: false,
    shiftKeyState: false,
  } as KeyboardState,
  reducers: {
    setCtrlKeyState:(state, action) => {
      state.ctrlKeyState = action.payload
    },
    setShiftKeyState: (state, action) => {
      state.shiftKeyState = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setCtrlKeyState, setShiftKeyState } = keyboardReducer.actions

export default keyboardReducer.reducer