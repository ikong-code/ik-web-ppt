import { useRef, useEffect, useMemo } from "react"
import Checkboard from "./Checkboard"

const Alpha = ({ value, onChange }: any) => {
  const alphaRef = useRef<any>(null)

  useEffect(() => {
    return () => {
      unbindEventListeners()
    }
  }, [])

  const gradientColor = useMemo(() => {
    const rgbaStr = [value.r, value.g, value.b].join(",")
    return `linear-gradient(to right, rgba(${rgbaStr}, 0) 0%, rgba(${rgbaStr}, 1) 100%)`
  }, [value])

  const handleChange = (e: MouseEvent) => {
    e.preventDefault()
    if (!alphaRef.current) return
    const containerWidth = alphaRef.current.clientWidth
    const xOffset =
      alphaRef.current.getBoundingClientRect().left + window.pageXOffset
    const left = e.pageX - xOffset

    let a = 0

    if (left < 0) {
      a = 0
    } else if (left > containerWidth) {
      a = 1
    } else {
      a = Math.round((left * 100) / containerWidth) / 100
    }

    if (value.a !== a) {
      onChange({
        r: value.r,
        g: value.g,
        b: value.b,
        a: a,
      })
    }
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

  return (
    <div className="alpha">
      <div className="alpha-checkboard-wrap">
        <Checkboard />
      </div>
      <div
        className="alpha-gradient"
        style={{ background: gradientColor }}
      ></div>
      <div
        className="alpha-container"
        ref={alphaRef}
        onMouseDown={handleMouseDown}
      >
        <div className="alpha-pointer" style={{ left: value.a * 100 + "%" }}>
          <div className="alpha-picker"></div>
        </div>
      </div>
    </div>
  )
}

export default Alpha
