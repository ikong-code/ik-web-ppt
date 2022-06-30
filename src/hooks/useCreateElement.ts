import { useSelector, useDispatch } from "react-redux"
import { createRandomCode } from "@/utils/common"
import { getImageSize } from "@/utils/image"
import { VIEWPORT_SIZE } from "@/config/canvas"
import { PPTElement, PPTShapeElement } from "@/types/slides"
import { ShapePoolItem } from "@/config/shapes"
import { addElement, addSnapshot } from "@/store/slidesReducer"
import {
  setActiveElementIdList,
  setCreatingElement,
  setEditorareaFocus,
} from "@/store/canvasReducer"

interface CommonElementPosition {
  top: number
  left: number
  width: number
  height: number
}

export default () => {
  const creatingElement = useSelector(
    (state: any) => state.canvas.creatingElement
  )
  const theme = useSelector((state: any) => state.slides.theme)

  const dispatch = useDispatch()

  // 创建（插入）一个元素并将其设置为被选中元素
  const createElement = (element: PPTElement) => {
    dispatch(addElement(element))
    dispatch(setActiveElementIdList([element.id]))

    if (creatingElement) {
      dispatch(setCreatingElement(null))
    }

    setTimeout(() => {
      dispatch(setEditorareaFocus(true))
    }, 0)
    dispatch(addSnapshot())
  }

  /**
   * 创建图片元素
   * @param src 图片地址
   */
  const createImageElement = (dataURL: string, src: string, viewportRatio: number) => {
    getImageSize(dataURL).then(
      ({ width, height }: { width: number; height: number }) => {
        const scale = height / width
        if (scale < viewportRatio && width > VIEWPORT_SIZE) {
          width = VIEWPORT_SIZE
          height = width * scale
        } else if (height > VIEWPORT_SIZE * viewportRatio) {
          height = VIEWPORT_SIZE * viewportRatio
          width = height / scale
        }

        createElement({
          type: "image",
          id: createRandomCode(),
          src,
          width,
          height,
          left: (VIEWPORT_SIZE - width) / 2,
          top: (VIEWPORT_SIZE * viewportRatio - height) / 2,
          fixedRatio: true,
          rotate: 0,
        })
      }
    )
  }

  /**
   * 创建文本元素
   * @param position 位置大小信息
   * @param content 文本内容
   */
  const createTextElement = (
    position: CommonElementPosition,
    content = "请输入内容"
  ) => {
    const { left, top, width, height } = position
    createElement({
      type: "text",
      id: createRandomCode(),
      left,
      top,
      width,
      height,
      content,
      rotate: 0,
      fontSize: "16px",
      defaultFontName: theme.fontName,
      defaultColor: theme.fontColor,
    })
  }

  /**
   * 创建形状元素
   * @param position 位置大小信息
   * @param data 形状路径信息
   */
  const createShapeElement = (
    position: CommonElementPosition,
    data: ShapePoolItem
  ) => {
    const { left, top, width, height } = position
    const newElement: PPTShapeElement = {
      type: "shape",
      id: createRandomCode(),
      left,
      top,
      width,
      height,
      viewBox: data.viewBox,
      path: data.path,
      fill: theme.themeColor,
      fixedRatio: false,
      rotate: 0,
    }
    if (data.special) newElement.special = true
    createElement(newElement)
  }

  return {
    createImageElement,
    createTextElement,
    createShapeElement,
  }
}
