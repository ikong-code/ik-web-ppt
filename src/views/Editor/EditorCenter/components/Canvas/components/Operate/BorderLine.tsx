import classnames from 'classnames'
import { OperateBorderLine } from '@/types/edit'

interface IProps {
  type: OperateBorderLine,
  isWide?: boolean,
  style: any
}

const BoardLine = ({type, isWide, style }: IProps) => {
  return <div className={classnames(`border-line ${type}`, { 'wide': isWide })} style={style} />
}

export default BoardLine