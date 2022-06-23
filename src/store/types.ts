import { Slide, SlideTheme } from "@/types/slides"

export interface SlideState {
  slides: Slide[]
  theme: SlideTheme
  slideIndex: number
}

export interface KeyboardState {
  ctrlKeyState: boolean
  shiftKeyState: boolean
}

export interface ScreenState {
  screening: boolean
}
