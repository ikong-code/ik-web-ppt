import { Space, Buttons } from

export const getColumns = [
  {
    title: "PPT名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "发布时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    render: (text: string, record: any) => {
      return <Space>
        <Button>{'演示'}</Button>
        <Button>{'演示'}</Button>
      </Space>
    }
  },
]

export const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
]
