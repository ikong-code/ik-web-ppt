import { useMemo } from "react"
import classnames from "classnames"
import { useSelector } from "react-redux"
import { ElementTypes, PPTElement } from "@/types/slides"
import {
  BaseTextElement,
  BaseImageElement,
  BaseShapeElement,
} from "@/components/BaseElement"

interface IProps {
  elementInfo: PPTElement
  elementIndex: number
  // turnSlideToId: (taget: any) => void
}

const ScreenElement = ({
  elementInfo,
  elementIndex,
}: // turnSlideToId,
IProps) => {
  const theme = useSelector((state: any) => state.slides.theme)

  // TODO 打开元素绑定的超链接 打开web还是某个幻灯片
  const openLink = () => {
    const link = elementInfo.link
    if (link) {
      if (link.type === "web") {
        window.open(link.target)
      }
      //  else if (link.type === "slide") {
      //   turnSlideToId(link.target)
      // }
    }
  }

  const handleSelectElement = () => {}

  const currentElementComponent = useMemo(() => {
    if (elementInfo.type === "text") {
      return (
        <BaseTextElement
          elementInfo={elementInfo}
          editable={false}
          onSelectElement={handleSelectElement}
        />
      )
    }
    if (elementInfo.type === "image") {
      return (
        <BaseImageElement
          elementInfo={elementInfo}
          onSelectElement={handleSelectElement}
        />
      )
    }
    if (elementInfo.type === "shape") {
      return (
        <BaseShapeElement
          elementInfo={elementInfo}
          onSelectElement={handleSelectElement}
        />
      )
    }
    return null
  }, [elementInfo])

  return (
    <div
      className={classnames("screen-element", { link: elementInfo.link })}
      id={`screen-element-${elementInfo.id}`}
      style={{
        zIndex: elementIndex,
        color: theme.fontColor,
        fontFamily: theme.fontName,
      }}
      title={elementInfo.link?.target || ""}
      onClick={openLink}
    >
      {currentElementComponent}
    </div>
  )
}

export default ScreenElement
