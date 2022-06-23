import { useRef, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import useViewportSize from "@/hooks/useViewportSize"
import useGlobalHotKey from "@/hooks/useGlobalHotkey"
import EditableElement from "./components/EditableElement"
import ElementCreateSelection from "./components/ElementCreateSelection"
import AlignmentLine from "./components/AlignmentLine"
import Operate from "./components/Operate"
import useDragElement from "./hooks/useDragElement"
import useSelectElement from "./hooks/useSelectElement"
import useDragLineElement from "./hooks/useDragLineElement"
import useScaleElement from "./hooks/useScaleElement"
import useInsertFromCreateSelection from "./hooks/useInsertFromCreateSelection"
import useRotateElement from "./hooks/useRotateElement"
import { PPTElement } from "@/types/slides"
import { AlignmentLineProps } from "@/types/edit"
import {
  setActiveElementIdList,
  setEditorareaFocus,
} from "@/store/canvasReducer"
import "./index.scss"

const CanvasContainer = () => {
  useGlobalHotKey()

  const canvasRef = useRef(null)
  const viewportRef = useRef<HTMLDivElement | any>(undefined)
  const [elementList, setElementList] = useState<PPTElement[]>([])
  const alignmentLines = useRef<AlignmentLineProps | null>(null)

  const canvasScale = useSelector((state: any) => state.canvas.canvasScale)
  const creatingElement = useSelector(
    (state: any) => state.canvas.creatingElement
  )
  const activeElementIdList = useSelector(
    (state: any) => state.canvas.activeElementIdList
  )
  const handleElementId = useSelector(
    (state: any) => state.canvas.handleElementId
  )
  const activeGroupElementId = useSelector(
    (state: any) => state.canvas.activeGroupElementId
  )
  const editorAreaFocus = useSelector(
    (state: any) => state.canvas.editorAreaFocus
  )
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)
  const dispatch = useDispatch()

  const { viewportStyles } = useViewportSize(canvasRef)
  const { dragElement } = useDragElement(alignmentLines)
  const { selectElement } = useSelectElement(elementList, dragElement)
  const { dragLineElement } = useDragLineElement(elementList)
  const { rotateElement } = useRotateElement(elementList, viewportRef.current)

  const { scaleElement } = useScaleElement(elementList, alignmentLines.current)
  const { insertElementFromCreateSelection } = useInsertFromCreateSelection(
    viewportRef.current
  )

  useEffect(() => {
    const currentSlide = slides[slideIndex].elements
    setElementList(currentSlide ? currentSlide : [])
  }, [slides, slideIndex])

  // 点击画布的空白区域：清空焦点元素、设置画布焦点、清除文字选区
  const handleClickBlankArea = (e: MouseEvent | any) => {
    const contentEleList = document.querySelectorAll(".element-content")
    let isAreaInside = false
    for (let i of contentEleList) {
      if (i.contains(e.target)) {
        isAreaInside = true
      }
    }
    if (!isAreaInside) {
      dispatch(setActiveElementIdList([]))
      if (!editorAreaFocus) {
        dispatch(setEditorareaFocus(true))
      }
      removeAllRanges()
    }
  }

  // 清除文字选区
  const removeAllRanges = () => {
    const selection = window.getSelection()
    selection && selection.removeAllRanges()
  }

  return (
    <div className="canvas" ref={canvasRef} onClick={handleClickBlankArea}>
      {creatingElement && (
        <ElementCreateSelection
          onCreatedElement={insertElementFromCreateSelection}
        />
      )}
      <div
        className="viewport-wrapper"
        style={{
          width: viewportStyles.width * canvasScale + "px",
          height: viewportStyles.height * canvasScale + "px",
          left: viewportStyles.left + "px",
          top: viewportStyles.top + "px",
        }}
      >
        <div className="operates">
          {((alignmentLines.current || []) as any).map(
            (line: any, index: number) => {
              return (
                <AlignmentLine
                  key={index}
                  type={line.type}
                  axis={line.axis}
                  length={line.length}
                />
              )
            }
          )}

          {(elementList || []).map((element, index: number) => {
            return (
              <Operate
                key={element.id}
                elementInfo={element}
                isSelected={activeElementIdList.includes(element.id)}
                isActive={handleElementId === element.id}
                isActiveGroupElement={activeGroupElementId === element.id}
                rotateElement={rotateElement}
                scaleElement={scaleElement}
                dragLineElement={dragLineElement}
              />
            )
          })}

          {/* <ViewportBackground /> */}
        </div>
        <div
          className="viewport"
          ref={viewportRef}
          style={{ transform: `scale(${canvasScale})` }}
        >
          {(elementList || [])?.map((element: PPTElement, idx: number) => {
            return (
              <EditableElement
                key={element.id}
                elementInfo={element}
                elementIndex={idx + 1}
                isMultiSelect={activeElementIdList.length > 1}
                onSelectElement={selectElement}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CanvasContainer
