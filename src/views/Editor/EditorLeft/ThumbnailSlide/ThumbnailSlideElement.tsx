import { useMemo } from 'react'
import { ElementTypes, PPTElement } from '@/types/slides'
import { BaseTextElement, BaseImageElement } from '@/components/BaseElement'
import './index.scss'


interface IProps {
  elementInfo: PPTElement
  elementIndex: number
}

const ThumbnailSlideElement = ({ elementInfo, elementIndex }: IProps) => {

  const handleSelectElement = () => {
    console.log(111111111111)
  }
  const currentElementComponent = useMemo(() => {
    if(elementInfo.type === 'text') {
      return <BaseTextElement elementInfo={elementInfo} editable={false} onSelectElement={handleSelectElement} />
    }
    if( elementInfo.type === 'image') {
      return <BaseImageElement
        elementInfo={elementInfo}
        // onSelectElement={handleSelectElement}
      />
    }
  return null
  }, [elementInfo])

  return <div className="thumbnail-element-list">
    <div className="thumbnail-element-list__item" style={{ zIndex: elementIndex }}>
      {currentElementComponent}
    </div>
  </div>
}

export default ThumbnailSlideElement