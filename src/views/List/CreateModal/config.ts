export const schema = {
  type: "object",
  properties: {
    pptName: {
      name: "required_1",
      title: "PPT名称",
      type: "string",
      required: true,
      "x-component-props": {
        placeholder: "请输入"
      },
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    pptDesc: {
      name: "required_2",
      title: "描述",
      type: "string",
      "x-validator": {
        required: true,
      },
      "x-component-props": {
        placeholder: "请输入"
      },
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    file: {
      title: "附件",
      type: "string",
      placeholder: "请输入",
      "x-decorator": "FormItem",
      "x-component": "IDUpload",
    }
  },
}
