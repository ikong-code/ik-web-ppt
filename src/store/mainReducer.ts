import { createSlice } from '@reduxjs/toolkit'

export const mainReducer = createSlice({
  name: 'main',
  initialState: {
    abc: 90, // 画布可视区域百分比
  },
  reducers: {
    setAbc: (state, action) => {
      state.abc = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setAbc } = mainReducer.actions

export default mainReducer.reducer