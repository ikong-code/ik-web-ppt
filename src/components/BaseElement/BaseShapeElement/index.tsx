import { PPTElement } from "@/types/slides"
import { useSelector, useDispatch } from "react-redux"
import "./index.scss"

interface IProps {
  elementInfo: PPTElement | any
  onSelectElement: (
    e: any,
    elementInfo: PPTElement,
    canMove: boolean,
    elements: PPTElement[]
  ) => void
}
const BaseShapeElement = ({ elementInfo, onSelectElement }: IProps) => {
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)

  const handleSelectElement = (e: any, canMove = true) => {
    if (elementInfo.lock) return
    e.stopPropagation()

    onSelectElement(e, elementInfo, canMove, slides[slideIndex].elements)
  }

  const flipStyle = (flipH: boolean, flipV: boolean) => {
    let style = ""

    if (flipH && flipV) {
      style = "rotateX(180deg) rotateY(180deg)"
    } else if (flipV) {
      style = "rotateX(180deg)"
    } else if (flipH) {
      style = "rotateY(180deg)"
    }
    return style
  }

  const text = () => {
    const defaultText = {
      content: "",
      defaultFontName: "微软雅黑",
      defaultColor: "#000",
      align: "middle",
    }
    if (!elementInfo.text) return defaultText

    return elementInfo.text
  }

  const outlineWidth = elementInfo?.outline?.width || 0
  const outlineStyle = elementInfo?.outline?.style || "solid"
  const outlineColor = elementInfo?.outline?.color || "#d14424"

  return (
    <div
      className="editable-element-shape"
      style={{
        top: elementInfo.top + "px",
        left: elementInfo.left + "px",
        width: elementInfo.width + "px",
        height: elementInfo.height + "px",
      }}
    >
      <div
        className="rotate-wrapper"
        style={{ transform: `rotate(${elementInfo.rotate}deg)` }}
      >
        <div
          className="element-content"
          style={{
            opacity: elementInfo.opacity,
            // filter: shadowStyle ? `drop-shadow(${shadowStyle})` : "",
            transform: flipStyle(elementInfo.flipH, elementInfo.flipV),
            color: text().defaultColor,
          }}
          onMouseDown={handleSelectElement}
        >
          <svg
            overflow="visible"
            width={elementInfo.width}
            height={elementInfo.height}
          >
            {elementInfo.gradient && (
              <defs>
                {/* <GradientDefs
            :id="`editabel-gradient-${elementInfo.id}`" 
            :type="elementInfo.gradient.type"
            :color1="elementInfo.gradient.color[0]"
            :color2="elementInfo.gradient.color[1]"
            :rotate="elementInfo.gradient.rotate"
          /> */}
              </defs>
            )}
            <g
              transform={`scale(${elementInfo.width / elementInfo.viewBox}, ${
                elementInfo.height / elementInfo.viewBox
              }) translate(0,0) matrix(1,0,0,1,0,0)`}
            >
              <path
                className="shape-path"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="butt"
                strokeMiterlimit="8"
                strokeLinejoin="inherit"
                d={elementInfo.path}
                fill={
                  elementInfo.gradient
                    ? `url(#editabel-gradient-${elementInfo.id})`
                    : elementInfo.fill
                }
                stroke={outlineColor}
                strokeWidth={outlineWidth}
                strokeDasharray={outlineStyle === "dashed" ? "10 6" : "0 0"}
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BaseShapeElement
