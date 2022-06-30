import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { omit, cloneDeep } from "lodash"
import theme from "@/mocks/theme"
import slide from "@/mocks/slide"
import { SlideState } from "./types"
import { PPTElement, Slide } from "@/types/slides"
import { indexDB } from "@/utils/indexDB"

export const slidesReducer = createSlice({
  name: "slides",
  initialState: {
    slides: slide, // 幻灯片数组
    theme: theme, // 主题样式
    slideIndex: 0, // 当前页面索引
    snapshotCursor: -1, // 快照指针
    snapshotLength: 0, // 快照历史长度
  } as SlideState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = { ...action.payload }
    },
    updateSlideIndex: (state, action) => {
      state.slideIndex = action.payload
    },
    // 切换页
    cutSlideIndex: (state, action) => {
      if (action.payload === "prev") {
        const nextTarIdx = state.slideIndex - 1
        state.slideIndex = nextTarIdx >= 0 ? nextTarIdx : 0
      } else {
        const nextTarIdx = state.slideIndex + 1
        state.slideIndex =
          nextTarIdx >= state.slides.length - 1
            ? state.slides.length - 1
            : nextTarIdx
      }
    },
    setSlides: (state, action) => {
      state.slides = action.payload
    },
    /** 在当前slideIndex下新增一个幻灯片 { slide } */
    addSlides: (state, action) => {
      const copySlides = [...state.slides]
      const slides = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]
      const curIdx = state.slideIndex + 1
      copySlides.splice(curIdx, 0, ...slides)
      state.slideIndex = curIdx
      state.slides = [...copySlides]
    },
    /** 指定某个幻灯片下新增一个幻灯片 { targetId, slide } */
    addSlidesToNext: (state, action) => {
      const targetId = action.payload.targetId
      const copySlides = [...state.slides]
      const slide = action.payload.slide
      const tarIdx = copySlides.findIndex((i) => i.id === targetId)
      const curIdx = tarIdx + 1
      copySlides.splice(curIdx, 0, slide)
      state.slideIndex = curIdx
      state.slides = [...copySlides]
    },
    updateSlides: (state, action) => {
      const slideIndex = state.slideIndex
      state.slides[slideIndex] = {
        ...state.slides[slideIndex],
        ...action.payload,
      }
    },
    /** 删除幻灯片 传值幻灯片id */
    deleteSlides: (state, action) => {
      const copySlides = cloneDeep(state.slides)
      const id = action.payload
      const tarIdx = copySlides.findIndex((slide) => slide.id === id)
      if (tarIdx >= -1) {
        if (tarIdx === state.slideIndex) {
          if (tarIdx >= copySlides.length - 1) {
            state.slideIndex = copySlides.length - 2
          }
        }
        copySlides.splice(tarIdx, 1)
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
      const slideIndex = state.slideIndex
      const slide = state.slides[slideIndex]
      const elements = slide.elements.map((el: PPTElement) => {
        return id === el.id ? { ...el, ...props } : el
      })

      state.slides[slideIndex].elements = elements as PPTElement[]
    },
    removeElement: (state, action) => {
      const { id, propName } = action.payload
      const propsNames = typeof propName === "string" ? [propName] : propName
      const slideIndex = state.slideIndex
      const slide = state.slides[slideIndex]
      const elements = slide.elements.map((el) => {
        return el.id === id ? omit(el, propsNames) : el
      })
      state.slides[slideIndex].elements = elements as PPTElement[]
    },
    initSnapshot: (state) => {

      state.snapshotCursor = 0
      state.snapshotLength = 1
    },
    addSnapshot: (state) => {
      const slides = cloneDeep(state.slides)
      const slideIndex = state.slideIndex
      let snapshotCursor = state.snapshotCursor
      let snapshotLength = state.snapshotLength
      state.snapshotLength = snapshotLength + 1
      state.snapshotCursor = snapshotCursor + 1
      const setIndexDB = () => {
        return new Promise((resolve, reject) => {
          indexDB
            .read()
            .then((values: any) => {
              const curSnapshotlength = values.length + 1
              indexDB.add({ id: curSnapshotlength, slideIndex, slides })
              resolve(values.length)
            })
            .catch(() => {
              reject(0)
            })
        })
      }
      setIndexDB()
    },
    // 重做
    redo: (state) => {
      const slideIndex = state.slideIndex
      const slides = [...state.slides]
      state.slides[slideIndex] = {
        background: {
          color: "#ffffff",
          type: "solid",
        },
        elements: [],
        id: slides[slideIndex].id,
      }
      addSnapshot()
    },
    // 撤销
    undo: (state, action) => {
      let snapshotCursor = state.snapshotCursor
      if (snapshotCursor <= 0) return
      const { slides, slideIndex } = action.payload
      state.snapshotCursor = snapshotCursor - 1
      state.slides = slides
      state.slideIndex = slideIndex
    },
    closeDB: () => {
      indexDB.clear()
      indexDB.close()
    },
  },
})

// 内置了thunk插件，可以直接处理异步请求
// 传入当前指针 获取当前历史快照长度，指针是长度 - 1
// 撤销时 获取length[cursor - 1]的快照记录
// 删除 length = cursor + 1 的最新快照
export const asyncUndo =
  (payload: { type: string; data: number }) => async (dispatch: any) => {
    const values: any = await indexDB.read()
    if (values[payload.data - 1]) {
      dispatch(undo(values[payload.data - 1]))
    }
    await indexDB.delete(payload.data + 1)
  }

export const asyncInitDB = (payload: any) => async (dispatch: any) => {
  const { slides, slideIndex } = payload.data
  await indexDB.clear()
  await indexDB.openDB()
  await indexDB.add({ id: 1, slideIndex, slides })
  dispatch(initSnapshot())
}

export const {
  setTheme,
  updateSlideIndex,
  setSlides,
  addSlides,
  addSlidesToNext,
  updateSlides,
  deleteSlides,
  addElement,
  updateElement,
  removeElement,
  cutSlideIndex,
  addSnapshot,
  initSnapshot,
  undo,
  redo,
  closeDB,
} = slidesReducer.actions

export default slidesReducer.reducer
