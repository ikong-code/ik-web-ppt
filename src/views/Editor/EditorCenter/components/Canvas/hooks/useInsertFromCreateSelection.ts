import { storeToRefs } from "pinia"
import { useSelector, useDispatch } from "react-redux"
import {
  CreateElementSelectionData,
  CreatingLineElement,
  CreatingShapeElement,
} from "@/types/edit"
import useCreateElement from "@/hooks/useCreateElement"
import { setCreatingElement } from "@/store/canvasReducer"

export default (viewportRef: HTMLElement | undefined) => {
  const canvasScale = useSelector((state: any) => state.canvas.canvasScale)
  const creatingElement = useSelector(
    (state: any) => state.canvas.creatingElement
  )
  const dispatch = useDispatch()

  // 通过鼠标框选时的起点和终点，计算选区的位置大小
  const formatCreateSelection = (selectionData: CreateElementSelectionData) => {
    const { start, end } = selectionData

    if (!viewportRef) return
    const viewportRect = viewportRef.getBoundingClientRect()
    const [startX, startY] = start
    const [endX, endY] = end
    const minX = Math.min(startX, endX)
    const maxX = Math.max(startX, endX)
    const minY = Math.min(startY, endY)
    const maxY = Math.max(startY, endY)

    const left = (minX - viewportRect.x) / canvasScale
    const top = (minY - viewportRect.y) / canvasScale
    const width = (maxX - minX) / canvasScale
    const height = (maxY - minY) / canvasScale

    return { left, top, width, height }
  }

  // 通过鼠标框选时的起点和终点，计算线条在画布中的位置和起点终点
  const formatCreateSelectionForLine = (
    selectionData: CreateElementSelectionData
  ) => {
    const { start, end } = selectionData

    if (!viewportRef) return
    const viewportRect = viewportRef.getBoundingClientRect()

    const [startX, startY] = start
    const [endX, endY] = end
    const minX = Math.min(startX, endX)
    const maxX = Math.max(startX, endX)
    const minY = Math.min(startY, endY)
    const maxY = Math.max(startY, endY)

    const left = (minX - viewportRect.x) / canvasScale
    const top = (minY - viewportRect.y) / canvasScale
    const width = (maxX - minX) / canvasScale
    const height = (maxY - minY) / canvasScale

    const _start: [number, number] = [
      startX === minX ? 0 : width,
      startY === minY ? 0 : height,
    ]
    const _end: [number, number] = [
      endX === minX ? 0 : width,
      endY === minY ? 0 : height,
    ]

    return {
      left,
      top,
      start: _start,
      end: _end,
    }
  }

  const { createTextElement, createShapeElement, createLineElement } =
    useCreateElement()

  // 根据鼠标选区的位置大小插入元素
  const insertElementFromCreateSelection = (
    selectionData: CreateElementSelectionData
  ) => {
    if (!creatingElement) return

    const type = creatingElement.type
    if (type === "text") {
      const position = formatCreateSelection(selectionData)

      position && createTextElement(position)
    } else if (type === "shape") {
      const position = formatCreateSelection(selectionData)
      position &&
        createShapeElement(
          position,
          (creatingElement as CreatingShapeElement).data
        )
    }
    // else if (type === 'line') {
    //   const position = formatCreateSelectionForLine(selectionData)
    //   position && createLineElement(position, (creatingElement as CreatingLineElement).data)
    // }
    dispatch(setCreatingElement(null))
  }

  return {
    insertElementFromCreateSelection,
  }
}
