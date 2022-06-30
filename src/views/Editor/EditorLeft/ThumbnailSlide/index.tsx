import { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dropdown, Menu } from "antd"
import { ElementTypes, PPTElement, Slide } from "@/types/slides"
import { VIEWPORT_SIZE } from "@/config/canvas"
import ThumbnailSlideElement from "./ThumbnailSlideElement"
import useSlideBackgroundStyle from "@/hooks/useSlideBackgroundStyle"
import useSlideHandler from "@/hooks/useSlideHandler"
import useScreening from "@/hooks/useScreening"

import "./index.scss"

interface IProps {
  slide: Slide
  size: number
  visible: boolean
}

const ThumbnailSlide = ({ slide, size, visible }: IProps) => {
  const dispatch = useDispatch()
  const viewportRatio = useSelector((state: any) => state.canvas.viewportRatio)
  const { backgroundStyle } = useSlideBackgroundStyle()
  const { createSlideToNext, updateSlidesList, resetSlides, coptyAndPasteSlide, deleteSlide } =
    useSlideHandler()
  const { enterScreening } = useScreening()

  const handleClipPage = () => {}
  const handleCopyPage = () => {
    console.log(slide)
    coptyAndPasteSlide(slide)
  }
  const handlePastePage = () => {}
  const handleCurPlay = () => {
    enterScreening()
  }
  const handleAddPage = () => {
    createSlideToNext(slide.id)
  }
  const handleDeletePage = () => {
    deleteSlide(slide.id)
  }

  const rightClickMenu = (
    <Menu
      items={[
        // {
        //   label: <div onClick={handleClipPage}>剪贴页面</div>,
        //   key: "clip-page",
        // },
        {
          label: <div onClick={handleCopyPage}>复制并粘贴页面</div>,
          key: "copy-page",
        },
        // {
        //   label: <div onClick={handlePastePage}>粘贴页面</div>,
        //   key: "paste-page",
        // },
        {
          label: <div onClick={handleAddPage}>新建页面</div>,
          key: "add-page",
        },
        {
          label: <div onClick={handleDeletePage}>删除页面</div>,
          key: "delete-page",
        },
        {
          label: <div onClick={handleCurPlay}>从当前页演示</div>,
          key: "cur-play-page",
        },
      ]}
    />
  )

  const background = useMemo(() => slide.background, [slide])

  return (
    <div
      className="thumbnail-slide"
      style={{ width: size + "px", height: size * viewportRatio + "px" }}
    >
      <div
        className={`thumbnail-slide__elements ${
          visible ? "element-active" : ""
        }`}
        style={{
          width: VIEWPORT_SIZE + "px",
          height: VIEWPORT_SIZE * viewportRatio + "px",
          transform: `scale(${size / VIEWPORT_SIZE})`,
        }}
      >
        <Dropdown
          destroyPopupOnHide={true}
          overlay={rightClickMenu}
          trigger={["contextMenu"]}
        >
          <div
            className="thumbnail-slide__mask"
            onClick={(e) => {
              e.preventDefault()
            }}
          />
        </Dropdown>
        <div
          className="thumbnail-slide__background"
          style={{ ...backgroundStyle(background) }}
        />
        {(slide.elements || []).map((element: PPTElement, idx: number) => (
          <ThumbnailSlideElement
            key={idx}
            elementInfo={element}
            elementIndex={idx + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default ThumbnailSlide
