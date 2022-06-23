import ReactDOM from "react-dom/client"
import { HashRouter, Routes, Route } from "react-router-dom"
import Router from "./router"
import store from "./store"
import { Provider } from "react-redux"
import List from "@/views/List"
import PPTEntry from "@/views/PPTEntry"
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
