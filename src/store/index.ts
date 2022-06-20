import { configureStore } from "@reduxjs/toolkit"
import canvasReducer from "./canvasReducer"
import slidesReducer from "./slidesReducer"
import keyboardReducer from "./keyboardReducer"
import screenReducer from "./screenReducer"

export default configureStore({
  reducer: {
    canvas: canvasReducer,
    slides: slidesReducer,
    keyboard: keyboardReducer,
    screen: screenReducer,
  },
})
