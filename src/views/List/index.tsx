import { useEffect, useState } from "react"
import { Button, message, Table } from "antd"
import { Base64 } from 'js-base64';
import Cookies from 'js-cookie'
import moment from 'moment'
import axios from '@/service'
import api from '@/service/api'
import { getColumns } from "./config"
import { useNavigate } from 'react-router-dom'
import useModal from "@/hooks/useModal"
import CreatePPt from "./CreateModal"
import "./index.scss"
import Logo from '@/assets/images/logo.png'

const List = () => {
  const navigate = useNavigate()
  const createModalVisible = useModal()
  const [loading, setLoading] = useState(false)

  const [tablelist, setTableList] = useState<any>([])
  const [username, setUsername] = useState<string | undefined>()

  useEffect(() => {
    /** 获取用户登录信息 没有登陆信息跳转登录页 */
    const ssoU = Cookies.get('sso_u')
    if(ssoU) {
      const userInfoStr = Base64.decode(ssoU)
      const userInfo = JSON.parse(userInfoStr || '{}')
      setUsername(userInfo?.name_)
    } else {
      window.location.href = `http://sso.uban360.net/ca/baas/login?target=${window.location.href}`
    }
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
    createModalVisible.open({ title: "新建", username })
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
    const result: any = await axios.get('/xppt/ppt/delete?id=' + id)
    if(result.code === 200){
      message.success('删除成功')
      getList()
    }

  }

  const columns = getColumns({ handlePlay, handleEdit, handleDelete, username })

  return (
    <div className="ppt-list">
      <div className="ppt-list__header flex">
        <div className="header-left">
          <img src={Logo} />
          <span>XPPT</span>
          <span>一种有沉淀的周会分享方式</span>
        </div>
        <div className="header-right">
          你好，{username}
        </div>
      </div>
      <div className="ppt-list__content">
        <div className="content-header flex">
          <span>列表</span>
          {username && (
            <Button type="primary" onClick={handleCreate}>
              新建
            </Button>
          )}
          <Button type="primary" onClick={handleCreate}>
              新建
            </Button>
        </div>
        <Table
          dataSource={tablelist}
          loading={loading}
          rowKey="id"
          columns={columns}
        />
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
