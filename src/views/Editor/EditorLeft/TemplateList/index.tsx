import './index.scss'

interface IProps {
  onSelect: (item: number) => void;
}

const mockList = new Array(10).fill('').map((item, idx) => {
  return idx + 1
})

const TemplateList = ({ onSelect }: IProps) => {
  return <div className="template-list">
    {
      mockList.map((i) => {
        return <div className="template-list__item flex-center pointer" onClick={() => onSelect(i)}>{i}</div>
      })
    }
  </div>
}

export default TemplateList