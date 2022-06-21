import { useMemo, MouseEventHandler } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PPTElement, PPTAnimation } from '@/types/slides'
import { OperateResizeHandler, OperateLineHandler } from '@/types/edit'
import TextElementOperate from './TextElementOperate'
import ImageElementOperate from './ImageElementOperate'
import './index.scss'

interface IProps {
  elementInfo: PPTElement;
  isSelected: boolean;
  isActive: boolean;
  isActiveGroupElement: boolean;
  isMultiSelect?: boolean;
  rotateElement: (el: PPTElement) => void;
  scaleElement: (e: any, el: PPTElement, command: OperateResizeHandler) => void;
  openLinkDialog: () => void;
  dragLineElement: (e: any, element: PPTElement, command: OperateLineHandler) => void
}

const Operate = ({
  elementInfo,
  isSelected,
  isActive,
  isActiveGroupElement,
  // isMultiSelect,
  rotateElement,
  scaleElement,
  openLinkDialog,
  dragLineElement,
}: IProps) => {
  const canvasScale = useSelector((state: any) => state.canvas.canvasScale)
  const toolbarState = useSelector((state: any) => state.canvas.toolbarState)
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)

  const dispatch = useDispatch()

  const currentOperateComponent = useMemo(() => {
    if (elementInfo.type === "text") {
      return (
        <TextElementOperate
          elementInfo={elementInfo}
          handlerVisible={!elementInfo.lock && isActive}
          rotateElement={rotateElement}
          scaleElement={scaleElement}
          dragLineElement={dragLineElement}
        />
      )
    } else if (elementInfo.type === "image") {
      return (
        <ImageElementOperate
          elementInfo={elementInfo}
          handlerVisible={!elementInfo.lock && isActive}
          rotateElement={rotateElement}
          scaleElement={scaleElement}
          dragLineElement={dragLineElement}
        />
      )
    }
    return null
  }, [elementInfo, isActive])

  const elementIndexInAnimation = useMemo(() => {
    const animations = slides[slideIndex]?.animations || []
    return animations.findIndex(
      (animation: PPTAnimation) => animation.elId === elementInfo.id
    )
  }, [slides, slideIndex, elementInfo.id])


  return (
    <div
      className="operate"
      style={{
        top: elementInfo.top * canvasScale + "px",
        left: elementInfo.left * canvasScale + "px",
        transform: `rotate(${elementInfo.rotate}deg)`,
        transformOrigin: `${(elementInfo.width * canvasScale) / 2}px ${
          (elementInfo.height * canvasScale) / 2
        }px`,
      }}
    >
      {currentOperateComponent}
      {toolbarState === "elAnimation" && elementIndexInAnimation !== -1 && (
        <div className="animation-index">{elementIndexInAnimation + 1}</div>
      )}
    </div>
  )
}
export default Operate