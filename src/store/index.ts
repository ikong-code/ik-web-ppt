import { configureStore } from '@reduxjs/toolkit'
import canvasReducer from './canvasReducer'

export default configureStore({
  reducer: {
    canvas: canvasReducer
  },
})