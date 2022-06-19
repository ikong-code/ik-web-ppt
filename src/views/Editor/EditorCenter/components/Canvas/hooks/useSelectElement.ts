import { useSelector, useDispatch } from "react-redux"
import { uniq } from "lodash"
import {
  setEditorareaFocus,
  setActiveElementIdList,
  setHandleElementId,
} from "@/store/canvasReducer"
import { PPTElement } from "@/types/slides"

const useSelectElement = (
  elementList: PPTElement[],
  moveElement: (
    e: MouseEvent,
    element: PPTElement,
    activeIdList: string[],
    elementList: PPTElement[]
  ) => void
) => {
  const editorAreaFocus = useSelector(
    (state: any) => state.canvas.editorAreaFocus
  )
  const activeElementIdList = useSelector(
    (state: any) => state.canvas.activeElementIdList
  )
  const handleElementId = useSelector(
    (state: any) => state.canvas.handleElementId
  )

  const dispatch = useDispatch()

  // 选中元素
  // startMove 表示是否需要再选中操作后进入到开始移动的状态
  const selectElement = (
    e: MouseEvent,
    element: PPTElement,
    startMove = true,
    elementList: PPTElement[]
  ) => {
    if (!editorAreaFocus) {
      dispatch(setEditorareaFocus(true))
    }

    let newActiveIdList: string[] = [...activeElementIdList]
    if (!activeElementIdList.includes(element.id)) {
      newActiveIdList = [element.id]
      dispatch(setActiveElementIdList(uniq([...newActiveIdList])))
      dispatch(setHandleElementId(element.id))
    }
    // 如果目标元素已被选中，同时目标元素不是当前操作元素，则将其设置为当前操作元素
    else if (handleElementId !== element.id) {
      dispatch(setHandleElementId(element.id))
    }

    if (startMove) {
      setTimeout(() => {
        moveElement(e, element, uniq(newActiveIdList), elementList)
      }, 0)
    }
  }

  //  todo选中页面内的全部元素
  const selectAllElement = () => {
    const unlockedElements = elementList.filter((el) => !el.lock)
    const newActiveElementIdList = unlockedElements.map((el) => el.id)
    dispatch(setActiveElementIdList(newActiveElementIdList))
  }

  return {
    selectElement,
    selectAllElement,
  }
}

export default useSelectElement
