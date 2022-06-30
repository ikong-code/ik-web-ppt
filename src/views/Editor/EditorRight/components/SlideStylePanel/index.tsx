import { Divider, Button, Popover } from "antd"
import ColorPicker from "@/components/ColorPicker"
import FileInput from "@/components/FileInput"
import { cloneDeep } from 'lodash'
import {  } from '@/store/slidesReducer'
import { getImageDataURL } from "@/utils/image"
import axios from '@/service'
import api from '@/service/api'
import { Slide } from "@/types/slides"
import './index.scss'

interface Style {
  [key: string]: string | number | undefined
}

interface TitleItem {
  label: string
  style: Style
}

interface IProps {
  slides: Slide[]
  slideInfo: Slide
  onSlideSetting: (values: any, isSetting: boolean) => void
  onAllSlideSetting: (slides: Slide[]) => void
}

const SlideStylePanel = ({ slides, slideInfo, onSlideSetting, onAllSlideSetting }: IProps) => {

  // 更新幻灯片的background配置
  const handleSlidebackground = (value: string | boolean, type: string) => {
    onSlideSetting({
      background: { ...(slideInfo.background || {}), [type]: value },
    }, false)
  }

  const handleReplaceImage = async (files: any) => {
    const imageFile = files[0]

    const file = files[0]
    if (!file) return
    
    const result = await axios.post(api.upload, files)

    if (!imageFile) return
    const background = {
      ...slideInfo.background,
      type: 'image',
      image: result.data,
      imageSize: 'cover',
    }
    onSlideSetting({
      background,
    }, true)
  }

  /** 删除背景图片时，需要将type换为纯色背景 */
  const handleDelete = () => {
    const background = {
      ...slideInfo.background,
      type: 'solid',
      image: '',
      imageSize: 'cover',
    }
    onSlideSetting({
      background,
    }, true)
  }

  /** 设置背景图片到全部幻灯片 */
  const handleSettingAll = () => {
    const list = cloneDeep(slides)
    list.forEach(i => {
      i.background = {
        ...i.background,
        type: slideInfo?.background?.type as "image" | "solid" | "gradient",
        image: slideInfo?.background?.image,
        imageSize: slideInfo?.background?.imageSize,
      }
    })
    onAllSlideSetting(list)
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
      {slideInfo?.background?.image && <div
        className="origin-image"
        style={{ backgroundImage: `url(${slideInfo?.background?.image})` }}
      />}
      <div className="row btn-group">
        <Button>
          <FileInput onChange={handleReplaceImage}>添加背景图片</FileInput>
        </Button>
        {
          slideInfo?.background?.image && <Button onClick={handleDelete}>
            删除
          </Button>
        }
      </div>
      {slideInfo?.background?.image && <div className="row btn-group">
        <Button onClick={handleSettingAll}>
          应用背景到全部
        </Button>
      </div>}
    </div>
  )
}
export default SlideStylePanel
