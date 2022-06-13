import { useRef, useEffect } from 'react';
import { clone } from 'lodash'
import events from '../utils/EventEmitter'

const useCommands = (schema, forceUpdate) => {
  // command 数据池
  const { current: state, commands } = useRef<any>({
    queue: [], // command 队列
    current: -1, // 当前 command 在队列中的位置
    commands: {}, // command 和处理函数 Map 映射表
    commandList: [], // command 集合
    commandDestoryArray: [], // 需要被销毁的 command 集合（存在 init 方法的 command 需要被销毁）
  });

  useEffect(() => {
    state.commandList.forEach(command => command.init && state.commandDestoryArray.push(command.init()));
    return () => {
      state.commandDestoryArray.forEach(fn => fn && fn());
    }
  }, []);

   // 向 command 数据池中注册 command
   const registry = (command: any) => {
    if (state.commands[command.name]) return;
    state.commandList.push(command);
    state.commands[command.name] = () => { // 处理函数
      const execute = command.execute();
      execute.handle && execute.handle();
      if (!command.pushQueue) return;

      // 每次向队列中加入任务时，根据当前操作的任务，重新计算队列
      // 如，在本次加入此任务前，已发生了撤销操作，即 state.current !== state.queue.length - 1
      if (state.queue.length > 0) {
        state.queue = state.queue.slice(0, state.current + 1);
      }
      const { redo, undo } = execute;
      state.queue.push({ redo, undo }); // 保存前进后退
      state.current = state.current + 1;
    }
  }

  // 注册撤销 command
  registry({
    name: 'undo',
    keyboard: 'ctrl+z',
    execute() {
      return {
        handle() {
          console.log('撤销');
          let item = state.queue[state.current];
          if (item) {
            item.undo && item.undo();
            state.current --;
          }
        }
      }
    }
  });

  // 注册重做 command
  registry({
    name: 'redo',
    keyboard: 'ctrl+y',
    execute() {
      return {
        handle() {
          console.log('重做');
          let item = state.queue[state.current + 1];
          if (item) {
            item.redo && item.redo();
            state.current ++;
          }
        }
      }
    }
  });

  // 注册 drag command 撤销/重做
  registry({
    name: 'drag',
    pushQueue: true, // 标识支持操作 queue 的 command
    init() { // 初始化操作，注册时立即执行
      this.before = null; // 拖拽前保存 blocks 副本
      const start = () => this.before = clone(schema.blocks); // 避免地址引用
      const end = () => state.commands.drag();
      events.on('startDrag', start);
      events.on('endDrag', end);
      return () => {
        events.off('startDrag', start);
        events.off('endDrag', end);
      }
    },
    execute() {
      let before = this.before;
      // 目前采用的这种 forceUpdate 更新方式，对于 after 一定要进行深 clone，避免 schema.blocks 出现地址引用
      let after = clone(schema.blocks);
      return {
        undo() { // 撤销
          schema.blocks = before;
          forceUpdate(); // 切勿使用 setSchema，会造成重渲染时，画布元素闪烁
        },
        redo() { // 重做
          schema.blocks = after;
          forceUpdate();
        },
      }
    }
  });
  return { commands }
}

export default useCommands;