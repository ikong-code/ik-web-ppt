import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AlignmentLineAxis } from '@/types/edit'
import './index.scss'

interface IProps {
  type: string;
  axis: AlignmentLineAxis;
  length: number
}

const AlignmentLine = ({ type, axis, length }: IProps) => {
  const canvasScale = useSelector((state: any) => state.canvas.canvasScale)

  // 吸附对齐线的位置
  const postion = useMemo(() => {
    const left = axis.x * canvasScale + 'px'
    const top = axis.y * canvasScale + 'px'
    return { left ,top }
  }, [canvasScale, axis])

  // 吸附对齐线的长度
  const sizeStyle = useMemo(() => {
    if (type === 'vertical') return { height: length * canvasScale + 'px' }
    return { width: length * canvasScale + 'px' }
  }, [canvasScale, length])
  return <div className="alignment-line" style={postion}>
    <div className={`line ${type}`} style={sizeStyle} />
  </div>
}

export default AlignmentLine