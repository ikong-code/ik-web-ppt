import { BaseTextElement, BaseImageElement } from '@/components/BaseElement'
import { PPTElement } from '@/types/slides'
import { ContextmenuItem } from '@/components/Contextmenu/types'
import useDeleteElement from '@/hooks/useDeleteElement'

interface IProps {
  elementInfo: PPTElement,
  elementIndex: number;
  isMultiSelect: boolean;
  onSelectElement: (e: MouseEvent, element: PPTElement, canMove: boolean, elements: PPTElement[]) => void,
  openLinkDialog?: () => void,
}
const EditableElement = ({ elementInfo, elementIndex, isMultiSelect, onSelectElement, openLinkDialog }: IProps) => {
  const { deleteElement } = useDeleteElement()

  const contextmenus = (): ContextmenuItem[] => {
    if (elementInfo.lock) {
      return [{
        text: '解锁', 
        // handler: () => unlockElement(elementInfo),
      }]
    }

    return [
      {
        text: "剪切",
        subText: "Ctrl + X",
        // handler: cutElement,
      },
      {
        text: "复制",
        subText: "Ctrl + C",
        // handler: copyElement,
      },
      {
        text: "粘贴",
        subText: "Ctrl + V",
        // handler: pasteElement,
      },
      { divider: true },
      {
        text: "水平居中",
        // handler: () => alignElementToCanvas(ElementAlignCommands.HORIZONTAL),
        children: [
          {
            text: "水平垂直居中",
            // handler: () => alignElementToCanvas(ElementAlignCommands.CENTER),
          },
          {
            text: "水平居中",
            // handler: () =>
              // alignElementToCanvas(ElementAlignCommands.HORIZONTAL),
          },
          {
            text: "左对齐",
            // handler: () => alignElementToCanvas(ElementAlignCommands.LEFT),
          },
          {
            text: "右对齐",
            // handler: () => alignElementToCanvas(ElementAlignCommands.RIGHT),
          },
        ],
      },
      {
        text: "垂直居中",
        // handler: () => alignElementToCanvas(ElementAlignCommands.VERTICAL),
        children: [
          {
            text: "水平垂直居中",
            // handler: () => alignElementToCanvas(ElementAlignCommands.CENTER),
          },
          {
            text: "垂直居中",
            // handler: () => alignElementToCanvas(ElementAlignCommands.VERTICAL),
          },
          {
            text: "顶部对齐",
            // handler: () => alignElementToCanvas(ElementAlignCommands.TOP),
          },
          {
            text: "底部对齐",
            // handler: () => alignElementToCanvas(ElementAlignCommands.BOTTOM),
          },
        ],
      },
      { divider: true },
      {
        text: "置于顶层",
        disable: isMultiSelect && !elementInfo.groupId,
        // handler: () =>
        //   orderElement(elementInfo, ElementOrderCommands.TOP),
        children: [
          {
            text: "置于顶层",
            // handler: () =>
            //   orderElement(elementInfo, ElementOrderCommands.TOP),
          },
          {
            text: "上移一层",
            // handler: () =>
            //   orderElement(elementInfo, ElementOrderCommands.UP),
          },
        ],
      },
      {
        text: "置于底层",
        disable: isMultiSelect && !elementInfo.groupId,
        // handler: () =>
        //   orderElement(elementInfo, ElementOrderCommands.BOTTOM),
        children: [
          {
            text: "置于底层",
            // handler: () =>
            //   orderElement(props.elementInfo, ElementOrderCommands.BOTTOM),
          },
          {
            text: "下移一层",
            // handler: () =>
            //   orderElement(props.elementInfo, ElementOrderCommands.DOWN),
          },
        ],
      },
      { divider: true },
      {
        text: "设置链接",
        handler: openLinkDialog,
      },
      {
        text: elementInfo.groupId ? "取消组合" : "组合",
        subText: "Ctrl + G",
        // handler: elementInfo.groupId
        //   ? uncombineElements
        //   : combineElements,
        hide: !isMultiSelect,
      },
      {
        text: "全选",
        subText: "Ctrl + A",
        // handler: selectAllElement,
      },
      {
        text: "锁定",
        subText: "Ctrl + L",
        // handler: lockElement,
      },
      {
        text: "删除",
        subText: "Delete",
        handler: deleteElement,
      },
    ]
  }

  const currentElementComponent = () => {
    if (elementInfo.type === 'text') {
      return <BaseTextElement 
        elementInfo={elementInfo}
        onSelectElement={onSelectElement}
      />
    }
    if( elementInfo.type === 'image') {
      return <BaseImageElement
        elementInfo={elementInfo}
        onSelectElement={onSelectElement}
      />
    }
    return null
  }
  return currentElementComponent()
}

export default EditableElement