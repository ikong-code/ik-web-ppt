import { useState } from 'react'
import { Popover } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { fillDigit } from '@/utils/common'
import TemplateList from './TemplateList'

const mockList = new Array(10).fill('').map((item, idx) => {
  return { id: (idx + 1).toString(), name: Math.random().toString(36).slice(2) }
})
const EditorLeft = () => {
  const [popVisible, setPopVisible] = useState(false)

  const [list, setList] = useState(mockList)

  const handleAddOne = () => {
    console.log('增加一个幻灯片')
  }

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
    const target = list[source.index]
    const newList = [...list]
    newList.splice(source.index, 1)
    const moveAferList = [...newList.slice(0, destination.index), target, ...newList.slice(destination.index)]
    setList([...moveAferList])
  };


  return (
    <div className="content-left">
      <div className="content-left__top flex">
        <div className="add-one flex-center flex-1" onClick={handleAddOne}>
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
                  {list.map((item, idx) => (
                    <Draggable key={item.name} draggableId={item.name} index={idx}>
                      {(provided) => {
                        return <div
                          className="thumbnails-item flex-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={item.id}
                        >
                          <div className="order-number">
                            {fillDigit(idx + 1, 2)}
                          </div>: {item.id}
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