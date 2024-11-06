import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, BrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { providerRouters, BrowserRouters, HashRouters } from '@/router'
import store from './store'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import { ConfigProvider, theme } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'
import { registerMicroApps, start } from 'qiankun'

dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        locale={zhCN}
        theme={
          {
            // 1. 单独使用暗色算法
            // algorithm: theme.darkAlgorithm,
            // token: {
            //   borderRadius: 0,
            //   colorPrimary: '#468b3d',
            // },
          }
        }
      >
        {/* 支持新 data APIs的路由 */}
        {/* RouterProvider */}
        <RouterProvider router={providerRouters} />
        {/* 不支持新 data APIs的路由 */}
        {/* Browser路由 */}
        {/* <BrowserRouter>
          <BrowserRouters />
        </BrowserRouter> */}
        {/* 不支持新 data APIs的路由 */}
        {/* Hash路由 */}
        {/* <HashRouter>
          <HashRouters />
        </HashRouter> */}
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)

// 注册微服务
// registerMicroApps([
//   {
//     name: 'react app 1', // app name registered
//     entry: 'http;//localhost:8080',
//     container: '#qiankun1',
//     activeRule: '#/qiankun1',
//   },
//   {
//     name: 'react app 2',
//     entry: 'http;//localhost:30001',
//     container: '#qiankun2',
//     activeRule: '#/qiankun2',
//   },
// ])

// start()
