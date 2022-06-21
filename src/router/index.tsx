import { useRoutes } from "react-router-dom"
import { Suspense, lazy } from "react"
const routes = [
  {
    path: "/",
    auth: false,
    component: lazy(() => import("../views/List")),
  },
  {
    path: "/ppt/:type",
    auth: true,
    component: lazy(() => import("../views/PPTEntry")),
  },
  {
    path: "*",
    auth: false,
    component: lazy(() => import("../views/NotFound")),
  },
]

//根据路径获取路由
const checkAuth = (routers: any, path: String) => {
  for (const data of routers) {
    if (data.path == path) return data
    if (data.children) {
      const res: any = checkAuth(data.children, path)
      if (res) return res
    }
  }
  return null
}

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

const checkRouterAuth = (path: String) => {
  let auth = null
  auth = checkAuth(routes, path)
  return auth
}

const Router = () => useRoutes(generateRouter(routes))

export default Router
