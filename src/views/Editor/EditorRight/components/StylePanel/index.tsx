import { useMemo } from "react"
import ImageStylePanel from "./ImageStylePanel"
import TextStylePanel from "./TextStylePanel"
import ShapeStylePanel from "./ShapeStylePanel"
import { useSelector, useDispatch } from "react-redux"
import { PPTElement } from "@/types/slides"
import { updateElement } from "@/store/slidesReducer"
import "./index.scss"

const StylePanel = (props: any) => {
  const handleElementId = useSelector(
    (state: any) => state.canvas.handleElementId
  )
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)
  const dispatch = useDispatch()

  /** 更新组件配置样式 */
  const handleSettingConfig = (values: any) => {
    dispatch(updateElement({ id: handleElementId, props: values }))
  }

  /** 获取当前组件的右侧配置项 */
  const getCurrentElement = () => {
    if (slides[slideIndex]) {
      const elementList = slides[slideIndex].elements
      const targetElementIdx = elementList.findIndex(
        (i: PPTElement) => i.id === handleElementId
      )
      if (targetElementIdx > -1) {
        let component = null
        switch (elementList[targetElementIdx].type) {
          case "text":
            component = (
              <TextStylePanel
                {...props}
                elementInfo={elementList[targetElementIdx]}
                onSetting={handleSettingConfig}
              />
            )
            break
          case "image":
            component = (
              <ImageStylePanel
                {...props}
                elementInfo={elementList[targetElementIdx]}
                onSetting={handleSettingConfig}
              />
            )
            break
          case "shape":
            component = (
              <ShapeStylePanel
                {...props}
                elementInfo={elementList[targetElementIdx]}
                onSetting={handleSettingConfig}
              />
            )
            break
          default:
            component = null
        }
        return component
      }
      return null
    }
    return null
  }

  return <>{getCurrentElement()}</>
}
export default StylePanel
