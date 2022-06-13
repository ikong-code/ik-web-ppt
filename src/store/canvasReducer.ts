import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'canvas',
  initialState: {
    canvasPercentage: 90, // 画布可视区域百分比
    viewportRatio:  0.5625, // 可是区域比例，默认16:9
    canvasScale: 1, // 画布缩放比例（基于宽度1000px）
  },
  reducers: {
    setCanvasPercentage: (state, action) => {
      state.canvasPercentage = action.payload
    },
    setViewportRatio: (state, action) => {
      state.viewportRatio = action.payload
    },
    setCanvasScale: (state, action) => {
      state.canvasScale = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCanvasPercentage, setViewportRatio, setCanvasScale } = counterSlice.actions

export default counterSlice.reducer