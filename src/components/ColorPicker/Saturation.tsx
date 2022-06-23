import { useRef, useMemo } from "react"
import tinycolor, { ColorFormats } from "tinycolor2"
import { throttle, clamp } from "lodash"
import "./saturation.scss"

interface IProps {
  value: ColorFormats.RGBA
  hue: number
  onChange: (val: any) => void
}

const Saturation = ({ value, hue, onChange }: IProps) => {
  const saturationRef = useRef<HTMLDivElement>(null)

  const getColor = (value: any, hue: number) => {
    const hsva = tinycolor(value).toHsv()
    if (hue !== -1) {
      hsva.h = hue
    }
    return hsva
  }

  const bgColor = `hsl(${getColor(value, hue).h}, 100%, 50%)`
  const pointerTop = -(getColor(value, hue).v * 100) + 1 + 100 + "%"
  const pointerLeft = getColor(value, hue).s * 100 + "%"

  const handleChange = (e: MouseEvent) => {
    e.preventDefault()
    if (!saturationRef.current) return

    const containerWidth = saturationRef.current.clientWidth
    const containerHeight = saturationRef.current.clientHeight
    const xOffset =
      saturationRef.current.getBoundingClientRect().left + window.pageXOffset
    const yOffset =
      saturationRef.current.getBoundingClientRect().top + window.pageYOffset
    const left = clamp(e.pageX - xOffset, 0, containerWidth)
    const top = clamp(e.pageY - yOffset, 0, containerHeight)
    const saturation = left / containerWidth
    const bright = clamp(-(top / containerHeight) + 1, 0, 1)

    onChange({
      h: getColor(value, hue).h,
      s: saturation,
      v: bright,
      a: getColor(value, hue).a,
    })
  }

  const unbindEventListeners = () => {
    window.removeEventListener("mousemove", handleChange)
    window.removeEventListener("mouseup", unbindEventListeners)
  }
  const handleMouseDown = (e: any) => {
    handleChange(e)
    window.addEventListener("mousemove", handleChange)
    window.addEventListener("mouseup", unbindEventListeners)
  }

  console.log(pointerTop, "pointerTop()")

  return (
    <div
      className="saturation"
      ref={saturationRef}
      style={{ background: bgColor }}
      onMouseDown={handleMouseDown}
    >
      <div className="saturation-white" />
      <div className="saturation-black" />
      <div
        className="saturation-pointer"
        style={{
          top: pointerTop,
          left: pointerLeft,
        }}
      >
        <div className="saturation-circle"></div>
      </div>
    </div>
  )
}

export default Saturation
