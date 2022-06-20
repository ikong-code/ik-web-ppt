import { useState } from "react"
import { Dropdown, Menu, Drawer, Tooltip } from "antd"
import useScreening from "@/hooks/useScreening"
const EditorHeader = () => {
  const [shortcutKeyVisible, setShortcutKeyVisible] = useState(false)
  const { enterScreeningFromStart, enterScreening } = useScreening()

  const handleScreenPlay = (begin = true) => {
    begin ? enterScreeningFromStart() : enterScreening()
  }

  const fileMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a>导入</a>,
        },
        {
          key: "2",
          label: <a>导出</a>,
        },
      ]}
    />
  )

  const editMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a>撤销</a>,
        },
        {
          key: "2",
          label: <a>重做</a>,
        },
        {
          key: "3",
          label: <a>添加页面</a>,
        },
        {
          key: "4",
          label: <a>删除页面</a>,
        },
        {
          key: "5",
          label: <a>关闭网格线</a>,
        },
        {
          key: "6",
          label: <a>重置幻灯片</a>,
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

  return (
    <div className="ikppt-editor__header">
      <div className="left">
        <Dropdown overlay={fileMenu}>
          <div className="left-item">
            <i className="iconfont icon-icon" />
            文件
          </div>
        </Dropdown>
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
          <div className="right-item pointer">
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
