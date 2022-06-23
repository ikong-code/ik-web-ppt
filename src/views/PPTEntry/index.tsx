import { useState } from "react"
import { useSelector } from "react-redux"
import Editor from "../Editor"
import Screen from "../Screen"
import { ScreenState } from "@/store/types"

const WebPpt = () => {
  const screening = useSelector((state: any) => state.screen.screening)

  return <div className="ik-web-ppt">{screening ? <Screen /> : <Editor />}</div>
}

export default WebPpt
