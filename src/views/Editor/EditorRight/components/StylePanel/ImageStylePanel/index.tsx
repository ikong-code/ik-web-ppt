import { Divider, Button } from "antd"
import classnames from "classnames"
import { PPTElement } from "@/types/slides"
import FileInput from "@/components/FileInput"
import { getImageDataURL } from "@/utils/image"
import "./index.scss"

interface Style {
  [key: string]: string | number | undefined
}

interface TitleItem {
  label: string
  style: Style
}

interface IProps {
  elementInfo: PPTElement | any
  onSetting: (values: any) => void
}

const ImageStylePanel = ({ elementInfo, onSetting }: IProps) => {
  const handleTextPosition = (value: string | boolean, type: string) => {
    onSetting({ [type]: value })
  }
  // 只是替换图片，宽高等样式不变
  const handleReplaceImage = (files: any) => {
    const imageFile = files[0]
    if (!imageFile) return
    getImageDataURL(imageFile).then((dataURL) => {
      onSetting({ src: dataURL })
    })
  }

  console.log(elementInfo, "elementInfo")

  return (
    <div className="image-style-panel">
      <div
        className="origin-image"
        style={{ backgroundImage: `url(${elementInfo.src})` }}
      />
      <div className="row btn-group">
        <Button>
          <FileInput onChange={handleReplaceImage}>替换图片</FileInput>
        </Button>
      </div>
      <div className="row btn-group">
        <Button
          className={classnames({
            active: elementInfo.flipH,
          })}
          onClick={() => handleTextPosition(!elementInfo.flipH, "flipH")}
        >
          水平翻转
        </Button>
        <Button
          className={classnames({
            active: elementInfo.flipY,
          })}
          onClick={() => handleTextPosition(!elementInfo.flipY, "flipY")}
        >
          垂直翻转
        </Button>
      </div>
      <Divider />
    </div>
  )
}
export default ImageStylePanel
