import { Select } from "antd"
import "./index.scss"

interface IProps {
  value: string | number | undefined
  options: any[]
  onChange: (values: any) => void
  children?: React.ReactNode
  disabled?: boolean
  style?: Object
}

const SelectComp = ({
  value,
  options = [],
  onChange,
  children = null,
  disabled = false,
  style = {},
}: IProps) => {
  return (
    <Select
      className="ppt-select"
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={style}
    >
      {children ||
        options.map((item: any) => (
          <Select.Option key={item.value || item} value={item.value || item}>
            {item.label || item}
          </Select.Option>
        ))}
    </Select>
  )
}

export default SelectComp
