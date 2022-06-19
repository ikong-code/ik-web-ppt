import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setDisableHotkeys } from "@/store/canvasReducer"
import { deleteElement, deleteSlides } from "@/store/slidesReducer"
import { KEYS } from "@/config/hotkey"
import useDeleteElement from "./useDeleteElement"

const useGlobalHotKey = () => {
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
    if (activeElementIdList.length) {
      deleteElement(slides, slideIndex, activeElementIdList)
    } else if (thumbnailsFocus) {
      deleteSlides()
    }
  }

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      const { ctrlKey, metaKey } = e
      const ctrlOrMetaKeyActive = ctrlKey || metaKey
      const key = e.key.toUpperCase()

      // backspace || delete键 删除节点 或 幻灯片
      if (key === KEYS.DELETE || key === KEYS.BACKSPACE) {
        if (disableHotkeys) return
        e.preventDefault()
        remove()
      }
    }
    document.addEventListener("keydown", keydownListener)
    return () => {
      document.removeEventListener("keydown", keydownListener)
    }
  }, [activeElementIdList, disableHotkeys])
}

export default useGlobalHotKey
