import { useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCreatingElement } from '@/store/canvasReducer'
import { CreateElementSelectionData } from '@/types/edit'
import './index.scss'

type startAndEndProps = number[] | undefined

interface IProps {
  onCreatedElement: (values: CreateElementSelectionData) => void
}

const ElementCreateSelection = ({ onCreatedElement }: IProps) => {
  
  const start = useRef<startAndEndProps>()
  const end = useRef<startAndEndProps>()

  const dispatch = useDispatch()
  const creatingElement = useSelector((state: any) => state.canvas.creatingElement)
  const ctrlKeyState = useSelector((state: any) => state.keyboard.ctrlKeyState)
  const shiftKeyState = useSelector((state: any) => state.keyboard.shiftKeyState)

  const getCtrlOrShiftKeyActive = useMemo(() => {
    return ctrlKeyState || shiftKeyState
  }, [ctrlKeyState, shiftKeyState])
  
  const handleCreated = (values: any) => {
    onCreatedElement(values)
  }

   // 鼠标拖动创建元素生成位置大小
    // 获取范围的起始位置和终点位置
    const createSelection = (e: any) => {
      e.stopPropagation();
      let isMouseDown = true

      const startPageX = e.pageX
      const startPageY = e.pageY
      start.current = [startPageX, startPageY]

      document.onmousemove = e => {
        if (!creatingElement || !isMouseDown) return

        let currentPageX = e.pageX
        let currentPageY = e.pageY

        // 按住Ctrl键或者Shift键时：
        // 对于非线条元素需要锁定宽高比例，对于线条元素需要锁定水平或垂直方向
        if (getCtrlOrShiftKeyActive) {
          const moveX = currentPageX - startPageX
          const moveY = currentPageY - startPageY

          // 水平和垂直方向的拖动距离，后面以拖动距离较大的方向为基础计算另一方向的数据
          const absX = Math.abs(moveX)
          const absY = Math.abs(moveY)

          if (creatingElement.type === 'shape') {

            // 判断是否为反向拖动：从左上到右下为正向操作，此外所有情况都是反向操作
            const isOpposite = (moveY > 0 && moveX < 0) || (moveY < 0 && moveX > 0)

            if (absX > absY) {
              currentPageY = isOpposite ? startPageY - moveX : startPageY + moveX
            }
            else {
              currentPageX = isOpposite ? startPageX - moveY : startPageX + moveY
            }
          }

          else if (creatingElement.type === 'line') {
            if (absX > absY) currentPageY = startPageY
            else currentPageX = startPageX
          }
        }

        end.current = [currentPageX, currentPageY]
      }

      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null

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
          creatingElement.value?.type === 'line' &&
          (Math.abs(endPageX - startPageX) >= minSize || Math.abs(endPageY - startPageY) >= minSize)
        ) {
          handleCreated({
            start: start.current,
            end: end.current,
          })
        }
        else if (
          creatingElement.value?.type !== 'line' &&
          (Math.abs(endPageX - startPageX) >= minSize && Math.abs(endPageY - startPageY) >= minSize)
        ) {
          handleCreated({
            start: start.current,
            end: end.current,
          })
        }
        else {
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


  const selectionRef = useRef(null)

  // 绘制线条的路径相关数据（仅当绘制元素类型为线条时使用）
  const lineData = useMemo(() => {
    if (!start.current || !end.current) return null
    if (!creatingElement || creatingElement.type !== 'line') return null

    const [_startX, _startY] = start.current
    const [_endX, _endY] = end.current
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
  }, [start.current, end.current, creatingElement])
  return <div 
    className="element-create-selection"
    ref={selectionRef}
    onMouseDown={createSelection}
  >
  {start.current && end.current && <div>

    // 绘制线条专用
    <svg
      v-if="creatingElement.type === 'line' && lineData"
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
        strokeLinejoin ="round"
        strokeMiterlimit="8"
      />
    </svg>
  </div>}
</div>
}

export default ElementCreateSelection