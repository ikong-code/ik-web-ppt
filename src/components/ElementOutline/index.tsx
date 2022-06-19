import { PPTElementOutline } from '@/types/slides'
import useElementOutline from '@/hooks/useElementOutline'
import './index.scss'

interface ElementOutline {
  width: number,
  height: number,
  outline: PPTElementOutline
}

const ElementOutline = ({ width, height, outline }: ElementOutline) => {

  const {
    outlineWidth,
    outlineStyle,
    outlineColor,
  } = useElementOutline(outline)
  if(!outline) {
    return null
  }
  return <svg 
  className="element-outline"
  overflow="visible" 
  width={width}
  height={height}
>
  <path 
    vectorEffect="non-scaling-stroke" 
    strokeLinecap="butt" 
    strokeMiterlimit="8"
    strokeLinejoin="round"
    fill="transparent"
    d={`M0,0 L${width},0 L${width},${height} L0,${height} Z`} 
    stroke={outlineColor}
    strokeWidth={outlineWidth} 
    strokeDasharray={outlineStyle === 'dashed' ? '10 6' : '0 0'} 
  ></path>
</svg>
}

export default ElementOutline