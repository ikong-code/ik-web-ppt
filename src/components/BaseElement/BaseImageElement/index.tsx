import { useSelector } from "react-redux"
import useElementShadow from "@/hooks/useElementShadow"
import { PPTTextElement, PPTElement } from "@/types/slides"
import { ContextmenuItem } from "@/components/Contextmenu/types"
import { updateElement } from "@/store/slidesReducer"
import ImageOutline from "./ImageOutline"
import "./index.scss"
import classNames from "classnames"

interface IProps {
  elementInfo: PPTTextElement | any
  contextmenus?: () => ContextmenuItem[]
  onSelectElement?: (
    e: any,
    elementInfo: PPTElement,
    canMove: boolean,
    elements: PPTElement[]
  ) => void
  onUpdateElement?: () => void
}

const BaseImageElement = ({
  elementInfo,
  contextmenus,
  onSelectElement,
}: IProps) => {
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)

  // const { shadowStyle } = useElementShadow(shadow)

  // 选择当前节点
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
  return (
    <div
      className={classNames("editable-element-image", {
        lock: elementInfo.lock,
      })}
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
            // filter: shadowStyle ? `drop-shadow(${shadowStyle})` : '',
            // transform: flipStyle,
            transform: flipStyle(elementInfo.flipH, elementInfo.flipY),
          }}
          onMouseDown={handleSelectElement}
        >
          {/* <ImageOutline :elementInfo="elementInfo" /> */}
          <div
            className="image-content"
            // style={{ clipPath: clipShape.style }}
          >
            <img
              src={elementInfo.src}
              draggable={false}
              style={
                {
                  // top: imgPosition.top,
                  // left: imgPosition.left,
                  // width: imgPosition.width,
                  // height: imgPosition.height,
                  // filter: filter,
                }
              }
              // dragstart={handle}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseImageElement
