export const schema = {
  type: "object",
  properties: {
    name: {
      name: "required_1",
      title: "XPPT名称",
      type: "string",
      required: true,
      "x-component-props": {
        placeholder: "请输入"
      },
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    desc: {
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
    // file: {
    //   title: "附件",
    //   type: "string",
    //   placeholder: "请输入",
    //   "x-decorator": "FormItem",
    //   "x-component": "IDUpload",
    // }
  },
}
