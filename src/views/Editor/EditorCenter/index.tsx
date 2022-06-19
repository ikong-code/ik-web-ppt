import HeaderTools from "./components/HeaderTools"
import Canvas from "./components/Canvas"
import "./index.scss"

const EditorCenter = () => {
  return (
    <div className="content-center">
      <HeaderTools />
      <Canvas />
    </div>
  )
}

export default EditorCenter
