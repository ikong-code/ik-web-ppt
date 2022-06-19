import { useMemo, Ref } from 'react'
import { PPTElementShadow } from '@/types/slides'

// 计算元素的阴影样式
export default (shadow: PPTElementShadow | undefined) => {
  const shadowStyle = useMemo(() => {
    if (shadow) {
      const { h, v, blur, color } = shadow
      return `${h}px ${v}px ${blur}px ${color}`
    }
    return ''
  }, [shadow])

  return {
    shadowStyle,
  }
}