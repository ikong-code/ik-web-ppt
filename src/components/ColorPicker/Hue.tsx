import { useRef, useEffect, useMemo } from "react"
import tinycolor, { ColorFormats } from "tinycolor2"

const Hue = ({ hue, value, onChange }: any) => {
  const oldHue = useRef<any>(0)
  const hueRef = useRef<any>()
  const pullDirection = useRef("")

  useEffect(() => {
    const hsla = tinycolor(value).toHsl()
    const h = hsla.s === 0 ? hue : hsla.h
    if (h !== 0 && h - oldHue.current > 0) pullDirection.current = "right"
    if (h !== 0 && h - oldHue.current < 0) pullDirection.current = "left"
    oldHue.current = h
    return () => {
      window.removeEventListener("mousemove", handleChange)
      window.removeEventListener("mouseup", unbindEventListeners)
    }
  }, [value, oldHue.current, pullDirection.current])

  const color = useMemo(() => {
    const hsla = tinycolor(value).toHsl()
    if (hue !== -1) hsla.h = hue
    return hsla
  }, [value, hue])

  const unbindEventListeners = () => {
    window.removeEventListener("mousemove", handleChange)
    window.removeEventListener("mouseup", unbindEventListeners)
  }
  const handleMouseDown = (e: any) => {
    handleChange(e)
    window.addEventListener("mousemove", handleChange)
    window.addEventListener("mouseup", unbindEventListeners)
  }

  const handleChange = (e: MouseEvent) => {
    e.preventDefault()
    if (!hueRef.current) return

    const containerWidth = hueRef.current.clientWidth
    const xOffset =
      hueRef.current.getBoundingClientRect().left + window.pageXOffset
    const left = e.pageX - xOffset
    let h, percent

    if (left < 0) {
      h = 0
    } else if (left > containerWidth) {
      h = 360
    } else {
      percent = (left * 100) / containerWidth
      h = (360 * percent) / 100
    }

    if (hue === -1 || value.h !== h) {
      onChange({
        h,
        l: color.l,
        s: color.s,
        a: color.a,
      })
    }
  }

  const pointerLeft = () => {
    if (color.h === 0 && pullDirection.current === "right") return "100%"
    return (color.h * 100) / 360 + "%"
  }

  return (
    <div className="hue">
      <div className="hue-container" ref={hueRef} onMouseDown={handleMouseDown}>
        <div className="hue-pointer" style={{ left: pointerLeft() }}>
          <div className="hue-picker"></div>
        </div>
      </div>
    </div>
  )
}

export default Hue
