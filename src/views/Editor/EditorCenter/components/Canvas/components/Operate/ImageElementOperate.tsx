import { useMemo, MouseEventHandler } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PPTTextElement, PPTElement } from '@/types/slides'
import { OperateResizeHandler, OperateLineHandler } from '@/types/edit'
import useCommonOperate from '../../hooks/useCommonOperate'
import BorderLine from './BorderLine'
import ResizeHandler from './ResizeHandler'

interface IProps {
  elementInfo: PPTTextElement | any;
  handlerVisible: boolean;
  rotateElement: (element: PPTTextElement) => void;
  scaleElement: (e: MouseEventHandler<HTMLDivElement>, element: PPTTextElement, command: OperateResizeHandler) => void;
  dragLineElement: (e: MouseEventHandler<HTMLDivElement>, element: PPTElement, command: OperateLineHandler) => void
}

const ImageElementOperate = ({ elementInfo, handlerVisible, rotateElement, scaleElement, dragLineElement }: IProps) => {

  const canvasScale = useSelector((state: any) => state.canvas.canvasScale)
  const { scaleWidth, scaleHeight } = useMemo(() => {
    const scaleWidth = elementInfo.width * canvasScale
    const scaleHeight = elementInfo.height * canvasScale
    return { scaleWidth, scaleHeight }
  }, [elementInfo.width, elementInfo.height, canvasScale])

  const { resizeHandlers, borderLines } = useCommonOperate(scaleWidth, scaleHeight)

  const handleMouseDown = (event: MouseEventHandler<HTMLDivElement>, direction: any) => {
    scaleElement(event, elementInfo, direction)
  }
  return <div className="text-element-operate">
    {
      handlerVisible && borderLines.map(line => {
        return <BorderLine 
          key={line.type} 
          type={line.type} 
          style={line.style}
        />
      })
    }
    {
      handlerVisible && resizeHandlers.map(point => {
        return <ResizeHandler
          key={point.direction}
          type={point.direction}
          rotate={elementInfo.rotate}
          style={point.style}
          element={elementInfo}
          onMouseDownEvent={(event) => handleMouseDown(event, point.direction)}
        />
      })
    }
    
  
  </div>
}

export default ImageElementOperate