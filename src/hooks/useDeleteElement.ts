import { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { PPTElement } from "@/types/slides"
// import useHistorySnapshot from '@/hooks/useHistorySnapshot'
import { setActiveElementIdList } from "@/store/canvasReducer"
import { updateSlides } from "@/store/slidesReducer"

const useDeleteElement = () => {
  const dispatch = useDispatch()

  // const { addHistorySnapshot } = useHistorySnapshot()

  // 删除全部选中元素
  const deleteElement = (
    slides,
    slideIndex: number,
    activeElementIdList: string[]
  ) => {
    if (!activeElementIdList.length) return
    let newElementList: PPTElement[] = []
    newElementList = slides[slideIndex].elements.filter(
      (el: PPTElement) => !activeElementIdList.includes(el.id)
    )

    dispatch(setActiveElementIdList([]))
    dispatch(updateSlides({ elements: [...newElementList] }))
    // addHistorySnapshot()
  }

  // 删除内面内全部元素(无论是否选中)
  const deleteAllElements = (slides, slideIndex) => {
    if (!slides[slideIndex].elements.length) return
    dispatch(setActiveElementIdList([]))
    dispatch(updateSlides({ elements: [] }))
    // addHistorySnapshot()
  }

  return {
    deleteElement,
    deleteAllElements,
  }
}

export default useDeleteElement
