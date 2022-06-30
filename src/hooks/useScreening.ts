import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom' 
import { setScreening } from "@/store/screenReducer"
import { enterFullscreen } from "@/utils/screen"
import { isFullscreen, exitFullscreen } from "@/utils/screen"
import { updateSlideIndex } from "@/store/slidesReducer"

const useScreening = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const params = location?.search?.split('&');
  const id = params[0]?.split('=')?.[1]
  const isScreening = !!params?.[1]
  // 从当前页开始放映
  const enterScreening = () => {
    enterFullscreen()
    dispatch(setScreening(true))
  }

  // 从第一页开始放映
  const enterScreeningFromStart = () => {
    dispatch(updateSlideIndex(0))
    enterScreening()
  }

  // 退出放映状态
  const exitScreening = () => {
    dispatch(setScreening(false))
    
    if (isFullscreen()) exitFullscreen()
    // setTimeout(() => {
      if(!!isScreening) {
        window.location.replace(`/xppt/`)
      }
    // }, 100)
    
  }

  return {
    enterScreening,
    enterScreeningFromStart,
    exitScreening,
  }
}

export default useScreening
