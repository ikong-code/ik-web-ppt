import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import Router from "./router"
import store from "./store"
import { Provider } from "react-redux"
import "./index.scss"
import "./globle.scss"
import "./assets/iconfont/iconfont.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HashRouter>
      <Router />
    </HashRouter>
  </Provider>
)
