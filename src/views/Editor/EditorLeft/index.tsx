import { useState } from 'react'
import { Popover } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux'
import { SlideState } from '@/store/types'
import { Slide } from '@/types/slides'
import { fillDigit } from '@/utils/common'
import useSlideHandler from '@/hooks/useSlideHandler'
import TemplateList from './TemplateList'
import ThumbnailSlide from './ThumbnailSlide'
import { updateSlideIndex } from '@/store/slidesReducer'

const mockList = new Array(10).fill('').map((item, idx) => {
  return { id: (idx + 1).toString(), name: Math.random().toString(36).slice(2) }
})
const EditorLeft = () => {
  const slidesList = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)
  const dispatch = useDispatch()

  const { createSlide, updateSlidesList, resetSlides, deleteSlide } = useSlideHandler()

  const [popVisible, setPopVisible] = useState(false)

  // const [list, setList] = useState(mockList)


  const handleSelect = () => {
    setPopVisible(false)
  }

  const templateContent = () => {
    return <TemplateList onSelect={handleSelect} />
  }

  const onDragEnd = (result: any) => {
    const {source, destination, draggableId} = result;
    //不在拖动范围内则视为没有进行拖动操作
    if (!destination) {
      return;
    }
    const target = slidesList[source.index]
    const newList = [...slidesList]
    newList.splice(source.index, 1)
    const moveAferList = [...newList.slice(0, destination.index), target, ...newList.slice(destination.index)]
    updateSlidesList([...moveAferList])
  };


  const handleSelectOne = (id: string) => {
    const copySlidesList = [...slidesList]
    const tarIdx = copySlidesList.findIndex(item => item.id === id)
    if(tarIdx > -1) {
      dispatch(updateSlideIndex(tarIdx))
    }
  }

  return (
    <div className="content-left">
      <div className="content-left__top flex">
        <div className="add-one flex-center flex-1" onClick={createSlide}>
          添加幻灯片
        </div>
        <Popover
          placement="bottomLeft"
          title={""}
          content={templateContent()}
          trigger="click"
          visible={popVisible}
        >
          <div className="select-btn" onClick={() => setPopVisible(true)}>
            +
          </div>
        </Popover>
      </div>
      <div className="content-left__bottom">
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId="droppable">
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {slidesList.map((item: Slide, idx: number) => (
                    <Draggable key={item.id} draggableId={item.id} index={idx}>
                      {(provided) => {
                        return <div
                          className="thumbnails-item flex-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={item.id}
                          onClick={() => handleSelectOne(item.id)}
                        >
                          <div className="order-number">
                            {fillDigit(idx + 1, 2)}
                          </div>
                          <ThumbnailSlide slide={item} size={120} visible={slideIndex === idx} />
                        </div>
                      }}
                    </Draggable>
                  ))}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default EditorLeft;