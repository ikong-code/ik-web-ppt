import { useSelector, useDispatch } from "react-redux"
import { ElementTypes, PPTElement, Slide } from "@/types/slides"
import { VIEWPORT_SIZE } from "@/config/canvas"
import ThumbnailSlideElement from "./ThumbnailSlideElement"
import "./index.scss"

interface IProps {
  slide: Slide
  size: number
  visible: boolean
}
const backgroundStyle = {}

const ThumbnailSlide = ({ slide, size, visible }: IProps) => {
  const canvasScale = useSelector((state: any) => state.canvas.canvasScale)
  const viewportRatio = useSelector((state: any) => state.canvas.viewportRatio)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)

  return (
    <div className="thumbnail-slide" style={{ width: size + 'px',
    height: size * viewportRatio + 'px',}}>
      <div
        className={`thumbnail-slide__elements ${visible ? 'element-active' : ''}`}
        style={{
          width: VIEWPORT_SIZE + "px",
          height: VIEWPORT_SIZE * viewportRatio + "px",
          transform: `scale(${ size / VIEWPORT_SIZE })`,
        }}
      >
        <div
          className="thumbnail-slide__background"
          style={{ ...backgroundStyle }}
        ></div>
        {(slide.elements || []).map((element: PPTElement, idx: number) => (
          <ThumbnailSlideElement
            key={idx}
            elementInfo={element}
            elementIndex={idx + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default ThumbnailSlide
