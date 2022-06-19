import { useMemo } from 'react'
import { PPTElementOutline } from '@/types/slides'

// 计算边框相关属性值，主要是对默认值的处理
export default (outline: PPTElementOutline | undefined) => {
  const outlineProps = useMemo(() => {
    const outlineWidth = outline?.width ?? 0
    const outlineStyle = outline?.style || 'solid'
    const outlineColor = outline?.color || '#d14424'
    return { outlineWidth, outlineStyle, outlineColor }
  }
  , [(outline || {})])

  

  return {
    ...outlineProps
  }
}