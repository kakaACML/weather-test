import {
  createBrowserRouter,
  createHashRouter,
  useRoutes,
  Navigate,
  useNavigate,
} from 'react-router-dom'
// import Index from '@/pages/index'
// import TestPage from '@/pages/testPage'

import React from 'react'
import routesConfig from './routesConfig'
import type { routeType } from './routesConfig'

// 为RouterProvider提供,支持新 data APIs的browser路由
// export const providerRouters = createBrowserRouter([
//   {
//     path: '/',
//     element: <Index />,
//     children: [
//       {
//         path: 'test',
//         element: <TestPage />,
//       },
//     ],
//   },
// ])
// 为RouterProvider提供,支持新 data APIs的hash路由
export const providerRouters = createHashRouter(renderRoutes(routesConfig))

// 利用useRoutes 提供Browser路由
export const BrowserRouters = () => {
  const elements = useRoutes(renderRoutes(routesConfig))
  return elements
}

// 利用useRoutes 提供Hash路由
export const HashRouters = () => {
  const elements = useRoutes(renderRoutes(routesConfig))
  return elements
}

// 提供自定义遍历路由对象，这样可以额外添加功能，如异步记载，和路由拦截
function renderRoutes(routers: Array<routeType>) {
  let temp = routers.map((item) => {
    interface resType extends routeType {
      element?: any
    }

    let res: resType = { ...item }

    // 组件
    if (item?.component) {
      if (res.path === '/') {
        // 公共组件或者layout组件，不进行懒加载，防止路由跳转时闪屏问题
        res.element = item.component
      } else {
        const Component = React.lazy(item.component)
        res.element = (
          <React.Suspense fallback={'加载中'}>
            <BeforeEach route={item}>
              <Component />
            </BeforeEach>
          </React.Suspense>
        )
      }

      // const Component = React.lazy(item.component)
      // res.element = (
      //   <React.Suspense fallback={'加载中'}>
      //     <BeforeEach route={item}>
      //       <Component />
      //     </BeforeEach>
      //   </React.Suspense>
      // )
    }

    // children
    if (item?.children) {
      res.children = renderRoutes(item.children)
    }

    // 重定向
    if (item?.redirect) {
      res.element = (
        <Navigate
          to={item.redirect}
          replace
        />
      )
    }

    return res
  })

  return temp
}

// 自定义路由拦截
function BeforeEach(props: { route: routeType; children: any }) {
  if (props?.route?.meta?.title) {
    document.title = props.route.meta.title
  }

  if (props?.route?.meta?.needLogin) {
    // 看是否登录
    // const navigate = useNavigate();
    // navigate('/login');
  }

  return <>{props.children}</>
}
