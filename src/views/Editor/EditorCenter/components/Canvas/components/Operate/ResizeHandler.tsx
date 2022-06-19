import { useMemo, MouseEventHandler } from 'react'
import classnames from 'classnames'
import { OperateResizeHandler } from '@/types/edit'
import { PPTElement } from '@/types/slides'

interface IProps {
  type: OperateResizeHandler,
  rotate: number,
  style: any,
  element: PPTElement,
  onMouseDownEvent: (e: MouseEventHandler<HTMLDivElement> | any) => void
}

const ResizeHandler = ({ type, rotate, style, element, onMouseDownEvent }: IProps) => {
  const rotateClassName = useMemo(() => {
    const prefix = 'rotate-'
      if (rotate > -22.5 && rotate <= 22.5) return prefix + 0
      else if (rotate > 22.5 && rotate <= 67.5) return prefix + 45
      else if (rotate > 67.5 && rotate <= 112.5) return prefix + 90
      else if (rotate > 112.5 && rotate <= 157.5) return prefix + 135
      else if (rotate > 157.5 || rotate <= -157.5) return prefix + 0
      else if (rotate > -157.5 && rotate <= -112.5) return prefix + 45
      else if (rotate > -112.5 && rotate <= -67.5) return prefix + 90
      else if (rotate > -67.5 && rotate <= -22.5) return prefix + 135
      return prefix + 0
  }, [rotate])

  return <div onMouseDown={onMouseDownEvent} className={classnames(`resize-handler ${type} ${rotateClassName}`)} style={style} />
}

export default ResizeHandler