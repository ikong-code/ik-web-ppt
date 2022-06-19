import { Tooltip, Upload, UploadProps, message } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { setCreatingElement } from "@/store/canvasReducer"
import { getImageDataURL } from "@/utils/image"
import FileInput from "@/components/FileInput"
import useCreateElement from "@/hooks/useCreateElement"

const HeaderTools = () => {
  const viewportRatio = useSelector((state: any) => state.canvas.viewportRatio)
  const dispatch = useDispatch()

  const { createImageElement } = useCreateElement()

  // 新建文本 Element
  const handleDrawText = () => {
    dispatch(setCreatingElement({ type: "text" }))
  }

  const insertImageElement = (files: File[]) => {
    const imageFile = files[0]
    if (!imageFile) return
    getImageDataURL(imageFile).then((dataURL: string) => {
      createImageElement(dataURL, viewportRatio)
    })
  }

  return (
    <div className="content-center__tools flex">
      <div className="tools-left flex">
        <Tooltip placement="top" title={"撤销"}>
          <div className="tools-item flex-center pointer">撤销</div>
        </Tooltip>
        <Tooltip placement="top" title={"重做"}>
          <div className="tools-item flex-center pointer">重做</div>
        </Tooltip>
      </div>
      <div className="tools-center flex">
        <Tooltip placement="top" title={"文字"}>
          <div
            className="tools-item flex-center pointer"
            onClick={handleDrawText}
          >
            文字
          </div>
        </Tooltip>
        <Tooltip placement="top" title={"图片"}>
          <div className="tools-item flex-center pointer">
            <FileInput onChange={insertImageElement}>图片</FileInput>
          </div>
        </Tooltip>
        <Tooltip placement="top" title={"插入形状"}>
          <div className="tools-item flex-center pointer">插入形状</div>
        </Tooltip>
        <Tooltip placement="top" title={"插入线条"}>
          <div className="tools-item flex-center pointer">插入线条</div>
        </Tooltip>
        <Tooltip placement="top" title={"插入表格"}>
          <div className="tools-item flex-center pointer">插入表格</div>
        </Tooltip>
        <Tooltip placement="top" title={"插入音视频"}>
          <div className="tools-item flex-center pointer">插入音视频</div>
        </Tooltip>
      </div>
      <div className="tools-right flex">
        <div className="tools-item flex-center pointer">-</div>
        <div className="tools-item flex-center pointer">100%</div>
        <div className="tools-item flex-center pointer">+</div>
      </div>
    </div>
  )
}

export default HeaderTools
