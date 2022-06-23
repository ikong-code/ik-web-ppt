import { useEffect, useMemo, useState } from "react"
import { throttle } from "lodash"
import { Dropdown, Menu } from "antd"
import classnames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { PPTElement, Slide } from "@/types/slides"
import ScreenSlide from "./components/ScreenSlide"
import { VIEWPORT_SIZE } from "@/config/canvas"
import { isFullscreen } from "@/utils/screen"
import useScreening from "@/hooks/useScreening"
import { updateSlideIndex } from "@/store/slidesReducer"
import { setScreening } from "@/store/screenReducer"
import "./index.scss"

const Screen = () => {
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)
  const viewportRatio = useSelector((state: any) => state.canvas.viewportRatio)
  const dispatch = useDispatch()

  const [slideWidth, setSlideWidth] = useState<number>(0)
  const [slideHeight, setSlideHeight] = useState<number>(0)
  const { exitScreening } = useScreening()

  const getCurrentSlide = useMemo(() => {
    return slides[slideIndex]
  }, [slides, slideIndex])

  const getScale = useMemo(() => {
    return slideWidth / VIEWPORT_SIZE
  }, [slideWidth])

  useEffect(() => {
    const windowResizeListener = () => {
      setSlideContentSize()
      if (!isFullscreen()) exitScreening()
    }
    window.addEventListener("resize", windowResizeListener)
    return () => {
      window.removeEventListener("resize", windowResizeListener)
    }
  }, [])

  // 上一页
  const handlePrePage = () => {
    dispatch(updateSlideIndex(slideIndex - 1))
  }

  // 下一页
  const handleNextPrePage = () => {
    dispatch(updateSlideIndex(slideIndex + 1))
  }

  // 结束放映
  const handleExitScreening = () => {
    exitScreening()
  }

  const rightClickMenu = (
    <Menu
      items={[
        {
          label: <div onClick={handlePrePage}>上一页</div>,
          disabled: slideIndex <= 0,
          key: "prev",
        },
        {
          label: <div onClick={handleNextPrePage}>下一页</div>,
          key: "next",
        },
        {
          label: <div onClick={handleExitScreening}>结束放映</div>,
          key: "exit",
        },
      ]}
    />
  )

  // 计算和更新幻灯片内容的尺寸（按比例自适应屏幕）
  const setSlideContentSize = () => {
    const winWidth = document.body.clientWidth
    const winHeight = document.body.clientHeight
    let width, height

    if (winHeight / winWidth === viewportRatio) {
      width = winWidth
      height = winHeight
    } else if (winHeight / winWidth > viewportRatio) {
      width = winWidth
      height = winWidth * viewportRatio
    } else {
      width = winHeight / viewportRatio
      height = winHeight
    }
    setSlideWidth(width)
    setSlideHeight(height)
  }

  // const mousewheelListener = throttle(function(e: any) {
  //   if (e.deltaY < 0) execPrev()
  //   else if (e.deltaY > 0) execNext()
  // }, 500, { leading: true, trailing: false })

  // 触摸屏上下滑动翻页
  // const touchInfo = ref<{ x: number; y: number; } | null>(null)

  // const touchStartListener = (e: TouchEvent) => {
  //   touchInfo.value = {
  //     x: e.changedTouches[0].pageX,
  //     y: e.changedTouches[0].pageY,
  //   }
  // }

  // const touchEndListener = (e: TouchEvent) => {
  //   if (!touchInfo.value) return

  //   const offsetX = Math.abs(touchInfo.value.x - e.changedTouches[0].pageX)
  //   const offsetY = e.changedTouches[0].pageY - touchInfo.value.y

  //   if ( Math.abs(offsetY) > offsetX && Math.abs(offsetY) > 50 ) {
  //     touchInfo.value = null

  //     if (offsetY > 0) execPrev()
  //     else execNext()
  //   }
  // }

  return (
    <div className="ppt-screen">
      <Dropdown overlay={rightClickMenu} trigger={["contextMenu"]}>
        <div
          className="slide-list"
          // onMousewheel={mousewheelListener}
          // onTouchstart={touchStartListener}
          // onTouchend={touchEndListener}
        >
          {slides.map((slide: Slide, index: number) => (
            <div
              key={slide.id}
              className={classnames(
                "slide-item",
                `turning-mode-${slide.turningMode || "slideY"}`,
                {
                  current: index === slideIndex,
                  before: index < slideIndex,
                  after: index > slideIndex,
                  hide: index === slideIndex - 1 || index === slideIndex + 1,
                }
              )}
            >
              {
                <div
                  className="slide-content"
                  style={{
                    width: slideWidth + "px",
                    height: slideHeight + "px",
                  }}
                >
                  <ScreenSlide
                    slide={slide}
                    scale={getScale}
                    viewportRatio={viewportRatio}
                    // animationIndex={animationIndex}
                    // turnSlideToId={turnSlideToId}
                  />
                </div>
              }
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  )
}

export default Screen
