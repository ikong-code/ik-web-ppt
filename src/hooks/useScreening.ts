import { useDispatch } from "react-redux"
import { setScreening } from "@/store/screenReducer"
import { enterFullscreen } from "@/utils/screen"
const useScreening = () => {
  const dispatch = useDispatch()

  // 从当前页开始放映
  const enterScreening = () => {
    enterFullscreen()
    dispatch(setScreening(true))
  }

  // 从第一页开始放映
  const enterScreeningFromStart = () => {}

  // 推出放映状态
  const exitScreening = () => {}

  return {
    enterScreening,
    enterScreeningFromStart,
    exitScreening,
  }
}

export default useScreening
