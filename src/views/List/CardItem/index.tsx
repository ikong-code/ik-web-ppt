import { Card, Skeleton, Avatar } from "antd"

const { Meta } = Card

interface IProps {
  detail: any
}

const CardItem = ({ detail }: IProps) => {
  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={["点赞", "编辑", "演示", "更多"]}
    >
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={detail?.name}
          description={detail?.desc}
        />
      </Skeleton>
    </Card>
  )
}

export default CardItem
