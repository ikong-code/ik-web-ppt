import { Divider, Button, Popover, Progress } from "antd"
import ColorPicker from "@/components/ColorPicker"
import classnames from "classnames"
import { PPTElement } from "@/types/slides"

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
  const handleTextStyle = (value: string | boolean, type: string) => {
    onSetting({ [type]: value })
  }

  return (
    <div className="shape-style-panel">
      <div className="row">
        <div style={{ flex: 1 }}>颜色填充：</div>
        <Popover
          trigger="click"
          content={
            <ColorPicker
              value={elementInfo?.defaultColor}
              onChange={(val: string) => handleTextStyle(val, "fill")}
            />
          }
        >
          <Button className="color-pick-btn" style={{ width: 160 }}>
            <div
              className="color-block"
              style={{ background: elementInfo.fill }}
            />
            <span className="icon iconfont icon-yanse"></span>
          </Button>
        </Popover>
      </div>
      <div className="row btn-group">
        <Button
          className={classnames({
            active: elementInfo.flipH,
          })}
          onClick={() => handleTextStyle(!elementInfo.flipH, "flipH")}
        >
          水平翻转
        </Button>
        <Button
          className={classnames({
            active: elementInfo.flipV,
          })}
          onClick={() => handleTextStyle(!elementInfo.flipV, "flipV")}
        >
          垂直翻转
        </Button>
      </div>
      <Divider />

      {/* <div className="row">
        <div style={{ flex: 2 }}>透明度：</div>
        <Progress
          className="slider"
          min={0}
          max={1}
          step={0.1}
          value={opacity}
          onChange={updateOpacity}
        />
      </div> */}
    </div>
  )
}
export default ImageStylePanel
