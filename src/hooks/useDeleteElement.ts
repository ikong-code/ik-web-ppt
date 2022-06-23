import { useDispatch } from "react-redux"
import { PPTElement, Slide } from "@/types/slides"
import { setActiveElementIdList } from "@/store/canvasReducer"
import { updateSlides } from "@/store/slidesReducer"

const useDeleteElement = () => {
  const dispatch = useDispatch()

  // 删除全部选中元素
  const deleteElement = (
    slides: Slide[],
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
  }

  return {
    deleteElement,
  }
}

export default useDeleteElement
