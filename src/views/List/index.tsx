import { useEffect, useState } from "react"
import { Button, Table } from "antd"
import moment from 'moment'
import { getColumns } from "./config"
import { useNavigate } from 'react-router-dom'
import useModal from "@/hooks/useModal"
import CreatePPt from "./CreateModal"
import "./index.scss"

const mockList = new Array(11).fill("").map((item, idx) => {
  return {
    i: Math.random().toString(36).slice(2),
    name: "jack" + idx,
    desc: "这个人很懒，什么都不说...",
    author: "jack",
    createTime: moment(new Date).format("YYYY-MM-DD HH:mm:ss")
  }
})

const List = () => {
  const navigate = useNavigate()
  const createModalVisible = useModal()
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState<any>([])

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

  // 打开新建弹窗
  const handleCreate = () => {
    createModalVisible.open({ title: "新建" })
  }

  const handleCreateOk = () => {
    navigate('/ppt')

    createModalVisible.close()
  }

  // 演示
  const handlePlay = () => {}
  
  // 编辑
  const handleEdit = () => {}
  
  // 删除
  const handleDelete = () => {}

  const columns = getColumns({ handlePlay, handleEdit, handleDelete })

  return (
    <div className="ppt-list">
      <div className="ppt-list__header flex">
        <span>PPT 列表</span>
        <Button type="primary" onClick={handleCreate}>
          创建PPT
        </Button>
      </div>
      <div className="ppt-list__content">
        <Table dataSource={list} loading={loading} rowKey="id" columns={columns} />
        {createModalVisible.visible && (
          <CreatePPt
            params={createModalVisible.params}
            onOk={handleCreateOk}
            onCancel={() => createModalVisible.close()}
          />
        )}
      </div>
    </div>
  )
}

export default List
