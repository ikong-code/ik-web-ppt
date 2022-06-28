import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { cloneDeep } from 'lodash'
import Editor from "../Editor"
import Screen from "../Screen"
import { closeDB, asyncInitDB } from '@/store/slidesReducer'

const WebPpt = () => {
  const screening = useSelector((state: any) => state.screen.screening)
  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)
  const dispatch = useDispatch()
  // opendIndexedDB()

  useEffect(() => {
    const copySlides = cloneDeep(slides)
    dispatch(asyncInitDB({type: 'initSnapshot', data: { slides: copySlides, slideIndex }}))
    return () => {
      dispatch(closeDB())
    }
  }, [])

  return <div className="ik-web-ppt">{screening ? <Screen /> : <Editor />}</div>
}

export default WebPpt
