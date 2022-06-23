import { useMemo } from "react"
import { PPTElement } from "@/types/slides"
import { VIEWPORT_SIZE } from "@/config/canvas"
import useSlideBackgroundStyle from "@/hooks/useSlideBackgroundStyle"
import ScreenElement from "../ScreenElement"
import "./index.scss"

interface IProps {
  slide: any
  viewportRatio: number
  scale: number
}

const ScreenSlide = ({ slide, viewportRatio, scale }: IProps) => {
  const background = useMemo(() => slide.background, [slide])
  const { backgroundStyle } = useSlideBackgroundStyle()

  return (
    <div
      className="screen-slide"
      style={{
        width: VIEWPORT_SIZE + "px",
        height: VIEWPORT_SIZE * viewportRatio + "px",
        transform: `scale(${scale})`,
      }}
    >
      <div
        className="background"
        style={{ ...backgroundStyle(background) }}
      ></div>
      {slide.elements.map((element: PPTElement, index: number) => (
        <ScreenElement
          key={element.id}
          elementInfo={element}
          elementIndex={index + 1}
        />
      ))}
    </div>
  )
}

export default ScreenSlide
