import ReactDOM from "react-dom/client"
import WebPpt from "./views/PPTEntry/index"
import store from "./store"
import { Provider } from "react-redux"
import "./index.scss"
import "./globle.scss"
import "./assets/iconfont/iconfont.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <WebPpt />
  </Provider>
)
