import { useState, useEffect, useRef, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setCreatingElement } from "@/store/canvasReducer"
import { CreateElementSelectionData } from "@/types/edit"
import "./index.scss"

interface IProps {
  onCreatedElement: (values: CreateElementSelectionData) => void
}

const ElementCreateSelection = ({ onCreatedElement }: IProps) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [end, setEnd] = useState([0, 0])

  const startRef = useRef<number[]>([])
  const selectionRef = useRef<any>(null)

  useEffect(() => {
    if (!selectionRef.current) return
    const { x, y } = selectionRef.current.getBoundingClientRect()
    setOffset({ x, y })
  }, [])

  const dispatch = useDispatch()
  const creatingElement = useSelector(
    (state: any) => state.canvas.creatingElement
  )

  const handleCreated = (values: any) => {
    onCreatedElement(values)
  }

  // 鼠标拖动创建元素生成位置大小
  // 获取范围的起始位置和终点位置
  const createSelection = (e: any) => {
    e.stopPropagation()
    let isMouseDown = true

    const startPageX = e.pageX
    const startPageY = e.pageY
    // setStart([startPageX, startPageY])
    startRef.current = [startPageX, startPageY]
    document.onmousemove = (e) => {
      if (!creatingElement || !isMouseDown) return

      let currentPageX = e.pageX
      let currentPageY = e.pageY
      setEnd([currentPageX, currentPageY])
    }

    document.onmouseup = (e) => {
      document.onmousemove = null
      document.onmouseup = null
      /** 按右键时不进行创建 */
      if (e.button === 2) {
        setTimeout(() => {
          dispatch(setCreatingElement(null))
        }, 0)
        return
      }

      isMouseDown = false

      const endPageX = e.pageX
      const endPageY = e.pageY

      const minSize = 30

      if (
        creatingElement?.type === "line" &&
        (Math.abs(endPageX - startPageX) >= minSize ||
          Math.abs(endPageY - startPageY) >= minSize)
      ) {
        handleCreated({
          start: startRef.current,
          end: [endPageX, endPageY],
        })
      } else if (
        creatingElement?.type !== "line" &&
        Math.abs(endPageX - startPageX) >= minSize &&
        Math.abs(endPageY - startPageY) >= minSize
      ) {
        setTimeout(() => {
          handleCreated({
            start: startRef.current,
            end: [endPageX, endPageY],
          })
        }, 6)
      } else {
        const defaultSize = 200
        const minX = Math.min(endPageX, startPageX)
        const minY = Math.min(endPageY, startPageY)
        const maxX = Math.max(endPageX, startPageX)
        const maxY = Math.max(endPageY, startPageY)
        const offsetX = maxX - minX >= minSize ? maxX - minX : defaultSize
        const offsetY = maxY - minY >= minSize ? maxY - minY : defaultSize
        handleCreated({
          start: [minX, minY],
          end: [minX + offsetX, minY + offsetY],
        })
      }
    }
  }

  // 绘制线条的路径相关数据（仅当绘制元素类型为线条时使用）
  const lineData = useMemo(() => {
    if (!startRef.current || !end) return null
    if (!creatingElement || creatingElement.type !== "line") return null

    const [_startX, _startY] = startRef.current
    const [_endX, _endY] = end
    const minX = Math.min(_startX, _endX)
    const maxX = Math.max(_startX, _endX)
    const minY = Math.min(_startY, _endY)
    const maxY = Math.max(_startY, _endY)

    const svgWidth = maxX - minX >= 24 ? maxX - minX : 24
    const svgHeight = maxY - minY >= 24 ? maxY - minY : 24

    const startX = _startX === minX ? 0 : maxX - minX
    const startY = _startY === minY ? 0 : maxY - minY
    const endX = _endX === minX ? 0 : maxX - minX
    const endY = _endY === minY ? 0 : maxY - minY

    const path = `M${startX}, ${startY} L${endX}, ${endY}`

    return {
      svgWidth,
      svgHeight,
      startX,
      startY,
      endX,
      endY,
      path,
    }
  }, [startRef.current, end, creatingElement])

  // 根据生成范围的起始位置和终点位置，计算元素创建时的位置和大小
  const position = () => {
    if (!startRef.current || !end) return {}

    const [startX, startY] = startRef.current
    const [endX, endY] = end
    const minX = Math.min(startX, endX)
    const maxX = Math.max(startX, endX)
    const minY = Math.min(startY, endY)
    const maxY = Math.max(startY, endY)

    const width = maxX - minX
    const height = maxY - minY
    return {
      left: minX - offset.x + "px",
      top: minY - offset.y + "px",
      width: width + "px",
      height: height + "px",
    }
  }
  return (
    <div
      className="element-create-selection"
      ref={selectionRef}
      onMouseDown={createSelection}
    >
      {startRef.current && end && (
        <div style={position()} className={`selection ${creatingElement.type}`}>
          {creatingElement.type === "line" && lineData && (
            <svg
              overflow="visible"
              width={lineData?.svgWidth}
              height={lineData?.svgHeight}
            >
              <path
                id={lineData?.path}
                stroke="#d14424"
                fill="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="round"
                strokeMiterlimit="8"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  )
}

export default ElementCreateSelection
