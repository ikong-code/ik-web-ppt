import { debounce } from "lodash"
import { useSelector, useDispatch } from "react-redux"
import ElementOutline from "@/components/ElementOutline"
import useElementShadow from "@/hooks/useElementShadow"
import { PPTTextElement, PPTElement } from "@/types/slides"
import { ContextmenuItem } from "@/components/Contextmenu/types"
import { updateElement } from "@/store/slidesReducer"
import { setDisableHotkeys } from "@/store/canvasReducer"

import "./index.scss"

interface IProps {
  elementInfo: PPTTextElement
  editable?: boolean
  contextmenus?: () => ContextmenuItem[]
  onSelectElement: (
    e: MouseEvent,
    elementInfo: PPTElement,
    canMove: boolean,
    elements: PPTElement[]
  ) => void
  onUpdateElement?: () => void
}

const BaseTextElement = ({
  elementInfo,
  contextmenus,
  onSelectElement,
  editable = true,
}: IProps) => {
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)

  // const { shadowStyle } = useElementShadow(shadow)

  const dispatch = useDispatch()

  // 选择当前节点
  const handleSelectElement = (e: MouseEvent, canMove = true) => {
    if (elementInfo.lock) return
    e.stopPropagation()

    onSelectElement(e, elementInfo, canMove, slides[slideIndex].elements)
  }

  const handleDisabledHotkey = () => {
    dispatch(setDisableHotkeys(true))
  }

  /** 编辑文本框内容 */
  const handleEditElement = debounce((e, disableHotkey = true) => {
    dispatch(
      updateElement({
        id: elementInfo.id,
        props: {
          content: e.target.innerHTML,
          width: elementInfo.width,
          height: e.target?.clientHeight + 20 || 0,
        },
      })
    )
    dispatch(setDisableHotkeys(disableHotkey))
  }, 16)

  return (
    <div
      className="editable-element-container"
      style={{
        top: elementInfo.top + "px",
        left: elementInfo.left + "px",
        width: elementInfo.width + "px",
      }}
    >
      <div
        className="rotate-wrapper"
        style={{ transform: `rotate(${elementInfo.rotate}deg)` }}
      >
        <div
          className="element-content"
          style={{
            backgroundColor: elementInfo.fill,
            opacity: elementInfo.opacity,
            // textShadow: shadowStyle,
            lineHeight: elementInfo.lineHeight,
            letterSpacing: (elementInfo.wordSpace || 0) + "px",
            color: elementInfo.defaultColor,
            fontFamily: elementInfo.defaultFontName,
          }}
          // contextmenu={contextmenus}
          onMouseDown={(e: any) => handleSelectElement(e)}
        >
          <ElementOutline
            width={elementInfo.width}
            height={elementInfo.height}
            outline={elementInfo.outline}
          />
          {/* TODO 问题：onInput事件会导致光标前置，与 dispatch更新有关，导致页面重刷  */}
          <div
            // onInput={handleEditElement}
            onFocus={handleDisabledHotkey}
            onBlur={(e: any) => handleEditElement(e, false)}
            suppressContentEditableWarning
            contentEditable={editable}
            className="text-ele-content"
            dangerouslySetInnerHTML={{ __html: elementInfo.content }}
            onMouseDown={(e: any) => handleSelectElement(e, false)}
          />
          {/* 当字号过大且行高较小时，会出现文字高度溢出的情况，导致拖拽区域无法被选中 */}
          <div className="drag-handler top"></div>
          <div className="drag-handler bottom"></div>
        </div>
      </div>
    </div>
  )
}

export default BaseTextElement
