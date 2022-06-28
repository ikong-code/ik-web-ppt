import { useDispatch } from 'react-redux'


/** 状态回溯 */
const useHistorySnapshot = () => {

  // 添加新的历史快照
  const addHistorySnapshot = () => {
    useDispatch()
  }

  // 重做
  const redo = () => {

  }

  // 撤销
  const undo = () => {
    
  }

  return {
    addHistorySnapshot,
    redo,
    undo
  }
}

export default useHistorySnapshot