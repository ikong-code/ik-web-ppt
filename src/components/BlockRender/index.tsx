import { useContext, useRef, useEffect, useReducer } from 'react';
import EditorContext from '../../context';
import './index.scss';

interface IParams {
  block: any,
  onMouseDown: any
}

const BlockRender = (props: IParams) => {
  const [, forceUpdate] = useReducer(v => v + 1, 0);
  const { config = {} } = useContext(EditorContext);
  const blockRef = useRef<any>();
  const { block, ...otherProps } = props;

  useEffect(() => {
    // const { offsetWidth, offsetHeight } = blockRef.current;

    let { width, height } = blockRef.current.getBoundingClientRect();
    const offsetWidth = Math.ceil(width), offsetHeight = Math.ceil(height);
  
    const { style } = block;
    if (block.alignCenter) {
      // block 初渲染至画布上时，记录一下尺寸大小，用于辅助线显示
      style.width = offsetWidth;
      style.height = offsetHeight;
      style.left = style.left - offsetWidth / 2;
      style.top = style.top - offsetHeight / 2;
      block.alignCenter = false;
      forceUpdate();
    }
  }, [block]);
  
  const blockStyle = {
    top: block.style.top,
    left: block.style.left,
    zIndex: block.style.zIndex,
  };

  const component = (config as any)?.componentMap[block.type];
  const RenderComponent = component.render();

  return (
    <div 
      className={`editor-block ${block.focus ? 'editor-block-focus' : ''}`} 
      style={blockStyle} 
      ref={blockRef}
      {...otherProps}>
      {RenderComponent}
    </div>
  )
}

export default BlockRender;