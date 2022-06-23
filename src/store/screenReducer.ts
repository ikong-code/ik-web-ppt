import { createSlice } from "@reduxjs/toolkit"
import { ScreenState } from "./types"
export const screenReducer = createSlice({
  name: "screen",
  initialState: {
    screening: false, // 放映状态
  } as ScreenState,
  reducers: {
    setScreening: (state, action) => {
      state.screening = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setScreening } = screenReducer.actions

export default screenReducer.reducer
