import { useMemo, useState } from "react"
import { createForm } from "@formily/core"
import { createSchemaField } from "@formily/react"
import { Modal, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from '@/service'
import api from '@/service/api'
import { Form, FormItem, Input, NumberPicker, Upload } from "@formily/antd"
import { schema } from "./config"

const IDUpload = (props: any) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: "authorization-text",
      }}
    >
      <Button icon={<UploadOutlined />}>上传附件</Button>
    </Upload>
  )
}

const CreatePPt = ({ params = {}, onOk, onCancel }: any) => {
  const form = useMemo(() => createForm(), [])
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { title = "创建" } = params

  const SchemaField = createSchemaField({
    components: {
      Input,
      IDUpload,
      FormItem,
      NumberPicker,
    },
  })

  const handleOk = async () => {
    const values: any = await form.submit()
    setConfirmLoading(true)
    const result = await axios.post(api.add, { ...values, username: 'aaa' })
    setConfirmLoading(false)
    onOk(result?.data?.id)
  }
  return (
    <Modal visible title={title} onOk={handleOk} confirmLoading={confirmLoading} onCancel={onCancel}>
      <Form form={form} labelCol={6} wrapperCol={10}>
        <SchemaField schema={schema} />
      </Form>
    </Modal>
  )
}

export default CreatePPt
