import { useState, useEffect } from "react"
import { Dropdown, Menu, Drawer, Tooltip, message, Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom'
import useScreening from "@/hooks/useScreening"
import useSlideHandler from "@/hooks/useSlideHandler"
import mockSlides from '@/mocks/slide'
import { setSlides } from '@/store/slidesReducer'
import axios from '@/service'
import api from '@/service/api'

const EditorHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = location?.search?.split('&');
  const id = params[0]?.split('=')?.[1]
  const isScreening = params[1]?.split('=')?.[1] === '1' // 1 演示状态

  const [shortcutKeyVisible, setShortcutKeyVisible] = useState(false)
  const { enterScreeningFromStart, enterScreening } = useScreening()

  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)

  const { createSlide, resetSlides, deleteSlide } = useSlideHandler()

  useEffect(() => {
    const getDetail = async () => {
      const result = await axios.get(`/xppt/ppt/detail?id=${id}`)
      const { data } = result
      if(data) {
        dispatch(setSlides(data))
        setTimeout(() => {
          if(isScreening) {
            enterScreeningFromStart()
          }
        }, 100)
      } else {
        dispatch(setSlides(mockSlides))
      }
    }
    getDetail()
  }, [])

  const getCurrentSlideID = () => {
    const slide = slides[slideIndex]
    if (slide) {
      return slides[slideIndex].id
    }
    return null
  }

  const handleScreenPlay = (begin = true) => {
    begin ? enterScreeningFromStart() : enterScreening()
  }

  const editMenu = (
    <Menu
      items={[
        // {
        //   key: "1",
        //   label: <a>撤销</a>,
        // },
        // {
        //   key: "2",
        //   label: <a>重做</a>,
        // },
        {
          key: "3",
          label: <a onClick={() => createSlide()}>添加页面</a>,
        },
        {
          key: "4",
          label: (
            <a onClick={() => deleteSlide(getCurrentSlideID())}>删除页面</a>
          ),
        },
        // {
        //   key: "5",
        //   label: <a>关闭网格线</a>,
        // },
        {
          key: "6",
          label: <a onClick={() => resetSlides()}>重置幻灯片</a>,
        },
      ]}
    />
  )

  const playMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a onClick={() => handleScreenPlay(true)}>从头开始</a>,
        },
        {
          key: "2",
          label: <a onClick={() => handleScreenPlay(false)}>从当前页开始</a>,
        },
      ]}
    />
  )

  const handleSave = async () => {
    const result = await axios.post(api.update, { id, detail: slides })
    message.success('保存成功')
    navigate(-1)
  }

  const handleBack = () => {
    Modal.confirm({
      title: '确定返回列表页吗，未保存数据会清除的?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        navigate(-1)
      },
    });
  }

  return (
    <div className="ikppt-editor__header">
      <div className="left">
      <div className="left-item" onClick={handleBack}>
          <i className="iconfont icon-houtui-kong" />
          返回列表页
        </div>
        {/* <Dropdown overlay={fileMenu}> */}
        <div className="left-item" onClick={handleSave}>
          <i className="iconfont icon-icon" />
          保存
        </div>
        {/* </Dropdown> */}
        <Dropdown overlay={editMenu}>
          <div className="left-item">
            <i className="iconfont icon-icon2" />
            编辑
          </div>
        </Dropdown>
        <Dropdown overlay={playMenu}>
          <div className="left-item">
            <i className="iconfont icon-touyingyanshi" />
            演示
          </div>
        </Dropdown>
        <div className="left-item" onClick={() => setShortcutKeyVisible(true)}>
          快捷键
        </div>
      </div>
      <div className="right">
        <Tooltip placement="bottom" title={"幻灯片放映"}>
          <div onClick={enterScreeningFromStart} className="right-item pointer">
            <i className="iconfont icon-touyingyanshi" />
          </div>
        </Tooltip>
      </div>
      <Drawer
        title="快捷键"
        placement="right"
        onClose={() => setShortcutKeyVisible(false)}
        visible={shortcutKeyVisible}
      ></Drawer>
    </div>
  )
}

export default EditorHeader
