import { useMemo } from "react"
import { Divider, Space, Button, Popover, Tooltip } from "antd"
import { presetStyles } from "../config"
import { useSelector } from "react-redux"
import classnames from "classnames"
import { PPTElement } from "@/types/slides"
import { Select } from "@/components/AntdComponent"
import ColorPicker from "@/components/ColorPicker"
import {
  fontSizeOptions,
  lineHeightOptions,
  wordSpaceOptions,
} from "./constants"
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

const TextStylePanel = ({ elementInfo, onSetting }: IProps) => {
  const handleTitleSetting = (item: TitleItem) => {
    onSetting(item.style)
  }

  const handleChangeStyle = (val: string | number, type: string) => {
    onSetting({ [type]: val })
  }

  const presetTitle = useMemo(() => {
    return (
      <div className="preset-title">
        {presetStyles.map((item: TitleItem) => (
          <div
            className="preset-style-item"
            key={item.label}
            style={item.style}
            onClick={() => handleTitleSetting(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }, [])

  const handleColorCahnge = (rgba: string, type: string) => {
    onSetting({ [type]: rgba })
  }

  const handleTextPosition = (value: string, type: string) => {
    onSetting({ [type]: value })
  }

  return (
    <div className="text-style-panel">
      {presetTitle}
      <Divider />
      <div className="row">
        <div style={{ flex: 1 }}>字体大小：</div>
        <Select
          style={{ width: 160 }}
          value={elementInfo?.fontSize}
          options={fontSizeOptions}
          onChange={(val: string | number) =>
            handleChangeStyle(val, "fontSize")
          }
        />
      </div>
      <div className="row">
        <div style={{ flex: 2 }}>行间距：</div>
        <Select
          style={{ width: 160 }}
          value={elementInfo?.lineHeight}
          options={lineHeightOptions}
          onChange={(val: string | number) =>
            handleChangeStyle(val, "lineHeight")
          }
        />
      </div>
      <div className="row">
        <div style={{ flex: 2 }}>字间距：</div>
        <Select
          style={{ width: 160 }}
          value={elementInfo?.wordSpace}
          options={wordSpaceOptions}
          onChange={(val: string | number) =>
            handleChangeStyle(val, "wordSpace")
          }
        />
      </div>
      <Divider />
      <div className="row btn-group">
        <Popover
          trigger="click"
          content={
            <ColorPicker
              value={elementInfo?.defaultColor}
              onChange={(val: string) => handleColorCahnge(val, "defaultColor")}
            />
          }
        >
          <Tooltip zIndex={1000} title="文字颜色">
            <Button>颜色</Button>
          </Tooltip>
        </Popover>
        {/* <Popover
          trigger="click"
          content={
            <ColorPicker
              value={elementInfo?.backcolor}
              onChange={(val: string) => handleColorCahnge(val, "backcolor")}
            />
          }
        >
          <Tooltip zIndex={1000} title="文字高亮">
            <Button>高亮</Button>
          </Tooltip>
        </Popover> */}
        <Popover
          trigger="click"
          content={
            <ColorPicker
              value={elementInfo?.fill}
              onChange={(val: string) => handleColorCahnge(val, "fill")}
            />
          }
        >
          <Tooltip zIndex={1000} title="文字填充">
            <Button>填充</Button>
          </Tooltip>
        </Popover>
      </div>
      <div className="row btn-group">
        <Tooltip zIndex={1000} title="左对齐">
          <Button
            className={classnames({ active: elementInfo.textAlign === "left" })}
            onClick={() => handleTextPosition("left", "textAlign")}
          >
            左对齐
          </Button>
        </Tooltip>
        <Tooltip zIndex={1000} title="居中">
          <Button
            className={classnames({
              active: elementInfo.textAlign === "center",
            })}
            onClick={() => handleTextPosition("center", "textAlign")}
          >
            居中
          </Button>
        </Tooltip>
        <Tooltip zIndex={1000} title="右对齐">
          <Button
            className={classnames({
              active: elementInfo.textAlign === "right",
            })}
            onClick={() => handleTextPosition("right", "textAlign")}
          >
            右对齐
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
export default TextStylePanel
