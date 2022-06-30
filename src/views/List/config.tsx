import { Space } from 'antd'

export interface IActions {
  handlePlay: (record: any) => void;
  handleEdit: (record: any) => void;
  handleDelete: (record: any) => void;
}

export const getColumns = ( { handlePlay, handleEdit, handleDelete }: IActions ) => [
  {
    title: "XPPT名称",
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
    dataIndex: "createtime",
    key: "createtime",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    render: (text: string, record: any) => {
      return (<Space>
        <a onClick={() => handlePlay(record)}>演示</a>
        <a onClick={() => handleEdit(record)}>编辑</a>
        <a onClick={() => handleDelete(record)}>删除</a>
      </Space>)
    }
  },
]