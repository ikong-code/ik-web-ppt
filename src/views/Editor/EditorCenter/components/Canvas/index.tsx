import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/store/canvasReducer'
import useViewportSize from '@/hooks/useViewportSize'
import './index.scss'

const CanvasContainer = () => {
  const canvasRef = useRef(null)
  const { viewportStyles } = useViewportSize(canvasRef)
  const canvasScale = useSelector((state: any) => state.canvas.canvasScale)
  const dispatch = useDispatch()

  console.log(viewportStyles, 'viewportStyles', canvasScale)

  return <div className="canvas" ref={canvasRef}>
    <div 
      className="viewport-wrapper"
      style={{
        width: viewportStyles.width * canvasScale + 'px',
        height: viewportStyles.height * canvasScale + 'px',
        left: viewportStyles.left + 'px',
        top: viewportStyles.top + 'px',
      }}
    >
      </div>
  </div>
}

export default CanvasContainer;