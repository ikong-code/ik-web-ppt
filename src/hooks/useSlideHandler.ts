import { useSelector, useDispatch } from "react-redux"
import { createRandomCode } from "@/utils/common"
import { Slide } from "@/types/slides"
import {
  updateSlideIndex,
  setSlides,
  addSlides,
  deleteSlides,
} from "@/store/slidesReducer"
import { setActiveElementIdList } from "@/store/canvasReducer"
const useSlideHandler = () => {
  const theme = useSelector((state: any) => state.slides.theme)
  const dispatch = useDispatch()

  // 创建一页空白页并添加到下一页
  const createSlide = () => {
    const emptySlide: Slide = {
      id: createRandomCode(8),
      elements: [],
      background: {
        type: "solid",
        color: theme.backgroundColor,
      },
    }
    dispatch(addSlides(emptySlide))
    dispatch(setActiveElementIdList([])) // 重置当前选择的element
  }

  // 重置幻灯片
  const resetSlides = () => {
    const emptySlide: Slide = {
      id: createRandomCode(8),
      elements: [],
      background: {
        type: "solid",
        color: theme.backgroundColor,
      },
    }
    dispatch(updateSlideIndex(0))
    dispatch(setActiveElementIdList([])) // 重置当前选择的element
    dispatch(setSlides([emptySlide]))
  }

  // 删除当前页，若将删除全部页面，则执行重置幻灯片操作
  const deleteSlide = (targetSlidesId: number | string) => {
    dispatch(deleteSlides(targetSlidesId))
  }

  const updateSlidesList = (slidesList: Slide[]) => {
    dispatch(setSlides(slidesList))
  }

  return {
    createSlide,
    resetSlides,
    deleteSlide,
    updateSlidesList,
  }
}

export default useSlideHandler
