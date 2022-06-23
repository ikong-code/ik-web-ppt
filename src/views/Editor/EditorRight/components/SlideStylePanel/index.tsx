import { Divider, Button, Popover } from "antd"
import ColorPicker from "@/components/ColorPicker"
import classnames from "classnames"
import { Slide } from "@/types/slides"

interface Style {
  [key: string]: string | number | undefined
}

interface TitleItem {
  label: string
  style: Style
}

interface IProps {
  slideInfo: Slide
  onSlideSetting: (values: any) => void
}

const SlideStylePanel = ({ slideInfo, onSlideSetting }: IProps) => {
  const handleSlideStyle = (value: string | boolean, type: string) => {
    onSlideSetting({ [type]: value })
  }

  // 更新幻灯片的background配置
  const handleSlidebackground = (value: string | boolean, type: string) => {
    onSlideSetting({
      background: { ...(slideInfo.background || {}), [type]: value },
    })
  }

  return (
    <div className="shape-style-panel">
      <div className="row">
        <div style={{ flex: 1 }}>背景色：</div>
        <Popover
          trigger="click"
          content={
            <ColorPicker
              value={slideInfo?.background?.color}
              onChange={(val: string) => handleSlidebackground(val, "color")}
            />
          }
        >
          <Button className="color-pick-btn" style={{ width: 160 }}>
            <div
              className="color-block"
              style={{ background: slideInfo?.background?.color || "#fff" }}
            />
            <span className="icon iconfont icon-yanse"></span>
          </Button>
        </Popover>
      </div>
      <div className="row btn-group"></div>
      <Divider />
    </div>
  )
}
export default SlideStylePanel
