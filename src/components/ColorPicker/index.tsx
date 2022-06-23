import { useMemo, useRef } from "react"
import tinycolor, { ColorFormats } from "tinycolor2"
import Saturation from "./Saturation"
import Checkboard from "./Checkboard"
import Hue from "./Hue"
import Alpha from "./Alpha"

import "./index.scss"

const presetColorConfig = [
  ["#7f7f7f", "#f2f2f2"],
  ["#0d0d0d", "#808080"],
  ["#1c1a10", "#ddd8c3"],
  ["#0e243d", "#c6d9f0"],
  ["#233f5e", "#dae5f0"],
  ["#632623", "#f2dbdb"],
  ["#4d602c", "#eaf1de"],
  ["#3f3150", "#e6e0ec"],
  ["#1e5867", "#d9eef3"],
  ["#99490f", "#fee9da"],
]

const themeColors = [
  "#000000",
  "#ffffff",
  "#eeece1",
  "#1e497b",
  "#4e81bb",
  "#e2534d",
  "#9aba60",
  "#8165a0",
  "#47acc5",
  "#f9974c",
]
const standardColors = [
  "#c21401",
  "#ff1e02",
  "#ffc12a",
  "#ffff3a",
  "#90cf5b",
  "#00af57",
  "#00afee",
  "#0071be",
  "#00215f",
  "#72349d",
]

interface IProps {
  value: string | undefined
  onChange: (val: string) => void
}

const ColorPicker = ({ value = "#e86b99", onChange }: IProps) => {
  const hue = useRef<any>(-1)
  const changeColor = (value: any) => {
    if ("h" in value) {
      hue.current = value.h
      setColor(tinycolor(value).toRgb())
    } else {
      hue.current = tinycolor(value).toHsl().h
      setColor(value)
    }
  }

  const getColor = tinycolor(value).toRgb()

  const setColor = (rgba: ColorFormats.RGBA) => {
    const rgbaString = `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(",")})`
    onChange(rgbaString)
  }

  const currentColor = () => {
    return `rgba(${[getColor.r, getColor.g, getColor.b, getColor.a].join(",")})`
  }

  const gradient = (startColor: string, endColor: string, step: number) => {
    const _startColor = tinycolor(startColor).toRgb()
    const _endColor = tinycolor(endColor).toRgb()

    const rStep = (_endColor.r - _startColor.r) / step
    const gStep = (_endColor.g - _startColor.g) / step
    const bStep = (_endColor.b - _startColor.b) / step
    const gradientColorArr = []

    for (let i = 0; i < step; i++) {
      const gradientColor = tinycolor({
        r: _startColor.r + rStep * i,
        g: _startColor.g + gStep * i,
        b: _startColor.b + bStep * i,
      }).toRgbString()
      gradientColorArr.push(gradientColor)
    }
    return gradientColorArr
  }

  /** 获取预设颜色列表 */
  const presetColors = useMemo(() => {
    const presetColors = []
    for (const color of presetColorConfig) {
      presetColors.push(gradient(color[1], color[0], 5))
    }
    return presetColors
  }, [])

  return (
    <div className="color-picker">
      <div className="picker-saturation-wrap">
        <Saturation value={getColor} hue={hue.current} onChange={changeColor} />
      </div>
      <div className="picker-controls">
        <div className="picker-color-wrap">
          <div
            className="picker-current-color"
            style={{ background: currentColor() }}
          ></div>
          <Checkboard />
        </div>
        <div className="picker-sliders">
          <div className="picker-hue-wrap">
            <Hue value={getColor} hue={hue.current} onChange={changeColor} />
          </div>
          <div className="picker-alpha-wrap">
            <Alpha value={getColor} onChange={changeColor} />
          </div>
        </div>
      </div>

      <div className="picker-presets">
        {themeColors.map((c) => (
          <div
            className="picker-presets-color"
            key={c}
            style={{ background: c }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>

      <div className="picker-gradient-presets">
        {presetColors.map((col, index) => (
          <div
            className="picker-gradient-col"
            v-for="(col, index) in presetColors"
            key={index}
          >
            {col.map((c) => (
              <div
                className="picker-gradient-color"
                key={c}
                style={{ background: c }}
                onClick={() => onChange(c)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="picker-presets">
        {standardColors.map((c) => (
          <div
            className="picker-presets-color"
            key={c}
            style={{ background: c }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
