import { useRef, useMemo, useEffect, useState } from 'react'
import { VIEWPORT_SIZE } from '@/config/canvas'
import { useSelector, useDispatch } from 'react-redux'
import { setCanvasScale } from '@/store/canvasReducer'

export default (canvasRef: any) => {

  const [viewportLeft, setViewportLeft] = useState<number>(0)
  const [viewportTop, setViewportTop] = useState<number>(0)

  const canvasPercentage = useSelector((state: any) => state.canvas.canvasPercentage)
  const viewportRatio = useSelector((state: any) => state.canvas.viewportRatio)
  const dispatch = useDispatch()

  // 计算画布可视区域的位置
  const setViewportPosition = () => {
    if (!canvasRef.current) return
    const canvasWidth = canvasRef.current.clientWidth
    const canvasHeight = canvasRef.current.clientHeight
    if (canvasHeight / canvasWidth > viewportRatio) {
      const viewportActualWidth = canvasWidth * (canvasPercentage / 100)

      dispatch(setCanvasScale(viewportActualWidth / VIEWPORT_SIZE))
      setViewportLeft((canvasWidth - viewportActualWidth) / 2)
      setViewportTop((canvasHeight - viewportActualWidth * viewportRatio) / 2)

    } else {

      const viewportActualHeight = canvasHeight * (canvasPercentage / 100)
      dispatch(setCanvasScale(viewportActualHeight / (VIEWPORT_SIZE * viewportRatio)))
      setViewportLeft((canvasWidth - viewportActualHeight / viewportRatio) / 2)
      setViewportTop((canvasHeight - viewportActualHeight) / 2)

    }
  }

  // 监听画布尺寸发生变化时，更新可视区域的位置
  const resizeObserver = new ResizeObserver(setViewportPosition)
  // 可视区域缩放或比例变化时，更新可视区域的位置
  useEffect(() => {
    setViewportPosition()
  }, [canvasPercentage, viewportRatio])
  // 可视区域缩放或比例变化时，更新可视区域的位置
  useEffect(() => {
    if(canvasRef.current) {
      resizeObserver.observe(canvasRef.current)
    }
    setViewportPosition()

    return () => {
      if(canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current)
      }
    }
  }, [canvasPercentage, viewportRatio])

  // 画布可视区域位置和大小的样式
  const viewportStyles = useMemo(() => {
    return {
      width: VIEWPORT_SIZE,
      height: VIEWPORT_SIZE * viewportRatio,
      left: viewportLeft,
      top: viewportTop,
    }
  }, [viewportLeft, viewportTop, viewportRatio])

  return {
    viewportStyles,
  }
}