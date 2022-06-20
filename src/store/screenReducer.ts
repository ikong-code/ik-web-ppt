import { createSlice } from "@reduxjs/toolkit"

export const screenReducer = createSlice({
  name: "screen",
  initialState: {
    abc: 90, // 画布可视区域百分比
    screening: false, // 放映状态
  },
  reducers: {
    setScreening: (state, action) => {
      state.screening = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setScreening } = screenReducer.actions

export default screenReducer.reducer
