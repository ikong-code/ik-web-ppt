import { useEffect, useState } from "react"
import { Button, message, Table } from "antd"
import moment from 'moment'
import axios from '@/service'
import api from '@/service/api'
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

  const [tablelist, setTableList] = useState<any>([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    setLoading(true)
    const result = await axios.get(api.list)
    const { data = [] } = result
    setTableList(data)
    setLoading(false)
  }

  // 打开新建弹窗
  const handleCreate = () => {
    createModalVisible.open({ title: "新建" })
  }

  const handleCreateOk = (id: string) => {
    navigate('/ppt?id=' + id)
    createModalVisible.close()
  }

  // 演示
  const handlePlay = ({ id }: { id: string }) => {
    navigate(`/ppt?id=${id}&screening=1`)
  }
  
  // 编辑
  const handleEdit = (record: any) => {
    navigate('/ppt?id=' + record.id)
  }
  
  // 删除
  const handleDelete = async ({id}: {id: string}) => {
    const result: any = await axios.get('/ppt/delete?id=' + id)
    if(result.code === 200){
      message.success('删除成功')
      getList()
    }

  }

  const columns = getColumns({ handlePlay, handleEdit, handleDelete })

  return (
    <div className="ppt-list">
      <div className="ppt-list__header flex">
        <span>XPPT 列表</span>
        <Button type="primary" onClick={handleCreate}>
          创建XPPT
        </Button>
      </div>
      <div className="ppt-list__content">
        <Table dataSource={tablelist} loading={loading} rowKey="id" columns={columns} />
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
