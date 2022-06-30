import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteSlides, cutSlideIndex } from "@/store/slidesReducer"
import { exitScreening } from "@/store/screenReducer"
import useDeleteElement from "./useDeleteElement"

// 编辑状态时某些快捷键操作不可以用
const useGlobalHotKey = (isScreening = false) => {
  const activeElementIdList = useSelector(
    (state: any) => state.canvas.activeElementIdList
  )
  const disableHotkeys = useSelector(
    (state: any) => state.canvas.disableHotkeys
  )
  const thumbnailsFocus = useSelector(
    (state: any) => state.canvas.thumbnailsFocus
  )
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)
  const dispatch = useDispatch()

  const { deleteElement } = useDeleteElement()

  const remove = () => {
    if (!!activeElementIdList.length) {
      deleteElement(slides, slideIndex, activeElementIdList)
    } else if (thumbnailsFocus) {
      deleteSlides(slides[slideIndex].id)
    }
  }

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      const { ctrlKey, metaKey } = e
      const key = e.key.toLowerCase()

      // 下一页
      if (e.key === "arrowdown" || key === "arrowright") {
        dispatch(cutSlideIndex("next"))
      }
      // 上一页
      if (e.key === "arrowup" || key === "arrowleft") {
        dispatch(cutSlideIndex("prev"))
      }

      if (isScreening) {
        // 退出放映状态
        if (key === "escape") {
          dispatch(exitScreening())
        }
      } else {
        // 撤销
        if (ctrlKey && key === "z") {
        }
        // backspace || delete键 删除节点 或 幻灯片
        if (key === "delete" || key === "backspace") {
          if (disableHotkeys) return
          e.preventDefault()
          remove()
        }
      }
    }
    document.addEventListener("keydown", keydownListener)
    return () => {
      document.removeEventListener("keydown", keydownListener)
    }
  }, [activeElementIdList, disableHotkeys])
}

export default useGlobalHotKey
