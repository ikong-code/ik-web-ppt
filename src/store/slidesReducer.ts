import { createSlice } from '@reduxjs/toolkit'
import { omit } from 'lodash'
import theme from '@/mocks/theme'
import slide from '@/mocks/slide'
import { SlideState } from './types'
import { PPTElement } from '@/types/slides'

export const slidesReducer = createSlice({
  name: 'slides',
  initialState: {
    slides: slide, // 幻灯片数组
    theme: theme, // 主题样式
    slideIndex: 0, // 当前页面索引
  } as SlideState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = { ...action.payload }
    },
    updateSlideIndex: (state, action) => {
      state.slideIndex = action.payload
    },
    setSlides: (state, action) => {
      state.slides = action.payload
    },
    addSlides: (state, action) => {
      const copySlides = [...state.slides]
      const slides = Array.isArray(action.payload) ? action.payload : [action.payload]
      const curIdx = state.slideIndex + 1
      copySlides.splice(curIdx, 0, ...slides)
      state.slideIndex = curIdx
      state.slides = [...copySlides]
    },

    updateSlides: (state, action) => {
      const slideIndex = state.slideIndex
      state.slides[slideIndex] = { ...state.slides[slideIndex], ...action.payload }
    },

    /** 删除幻灯片 传值幻灯片id */
    deleteSlides: (state, action) => {
      const copySlides = [...state.slides]
      const id = action.payload
      const tarIdx = copySlides.findIndex(slide => slide.id === id)
      if (tarIdx >= -1) {
        copySlides.splice(tarIdx, 1)
        if(tarIdx === state.slideIndex) {
          if(tarIdx >= copySlides.length + 1) {
            state.slideIndex = copySlides.length - 1
          }
        }
        state.slides = [...copySlides]
      }
    },

    addElement: (state, action) => {
      const element: PPTElement = action.payload
      const elements = Array.isArray(element) ? element : [element]
      const currentSlideEls = state.slides[state.slideIndex].elements
      const newEls = [...currentSlideEls, ...elements]
      state.slides[state.slideIndex].elements = newEls
    },
    updateElement: (state, action) => {
      const { id, props } = action.payload
      const elIdList = typeof id === 'string' ? [id] : id
  
      const slideIndex = state.slideIndex
      const slide = state.slides[slideIndex]
      const elements = slide.elements.map((el: PPTElement) => {
        return elIdList.includes(el.id) ? { ...el, ...props } : el
      })
      state.slides[slideIndex].elements = (elements as PPTElement[])
    },
    removeElement: (state, action) => {
      const { id, propName } = action.payload
      const propsNames = typeof propName === 'string' ? [propName] : propName
      const slideIndex = state.slideIndex
      const slide = state.slides[slideIndex]
      const elements = slide.elements.map(el => {
        return el.id === id ? omit(el, propsNames) : el
      })
      state.slides[slideIndex].elements = (elements as PPTElement[])
    }
  },
})

export const {
  setTheme,
  updateSlideIndex,
  setSlides,
  addSlides,
  updateSlides,
  deleteSlides,
  addElement,
  updateElement,
  removeElement,
} = slidesReducer.actions

export default slidesReducer.reducer