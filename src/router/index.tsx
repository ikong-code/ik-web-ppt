import { useRoutes } from "react-router-dom"
import { Suspense, lazy } from "react"
const routes = [
  {
    path: "/",
    component: lazy(() => import("../views/List")),
  },
  {
    path: "/ppt",
    component: lazy(() => import("../views/PPTEntry")),
  },
  {
    path: "*",
    component: lazy(() => import("../views/NotFound")),
  },
]

// 路由处理方式
const generateRouter = (routers: any) => {
  return routers.map((item: any) => {
    if (item.children) {
      item.children = generateRouter(item.children)
    }
    item.element = (
      <Suspense fallback={<div>加载中...</div>}>
        <item.component />
      </Suspense>
    )
    return item
  })
}

const Router = () => useRoutes(generateRouter(routes))
console.log(generateRouter(routes))
export default Router
