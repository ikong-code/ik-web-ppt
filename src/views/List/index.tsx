import { useEffect, useState } from "react"
import { Button, Tabs, Spin } from "antd"
import { dataSource, column } from "./config"
import CardItem from "./CardItem"
import CreatePPt from "./CreateModal"
import "./index.scss"

const { TabPane } = Tabs

const mockList = new Array(11).fill("").map((item, idx) => {
  return {
    i: idx + 1,
    name: "jack" + idx,
    desc: "这个人很懒，什么都不说...",
  }
})

const List = () => {
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<any>([])

  const onChange = (key: string) => {
    console.log(key)
  }

  useEffect(() => {
    setLoading(true)
    new Promise((resolve) => {
      setTimeout(() => {
        if (mockList) setList(mockList)
        setLoading(false)
        resolve("")
      }, 1500)
    })
  }, [])

  const handleCreate = () => {}

  return (
    <div className="ppt-list">
      <div className="ppt-list__header flex">
        <span>PPT 列表</span>
        <Button type="primary" onClick={handleCreate}>
          创建PPT
        </Button>
      </div>
      <div className="ppt-list__content">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="团队" key="1">
            {loading && (
              <div className="loading">
                <Spin size="large" spinning={loading} />
              </div>
            )}
            {list.map((i: any, idx: number) => (
              <CardItem key={idx} detail={i} />
            ))}
          </TabPane>
          <TabPane tab="个人" key="2">
            {loading && (
              <div className="loading">
                <Spin size="large" spinning={loading} />
              </div>
            )}
            {list.map((i: any, idx: number) => (
              <CardItem key={idx} detail={i} />
            ))}
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default List
