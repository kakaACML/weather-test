import Home from '@/layouts/index'
// 路由配置
export interface routeType {
  path?: string
  component?: any
  children?: Array<routeType>
  meta?: {
    title?: string
    needLogin?: boolean
  }
  index?: any
  redirect?: string
}

const routes: Array<routeType> = [
  {
    path: '/',
    component: <Home />,
    meta: {
      title: '首页',
    },
    children: [
      // {
      //   // 添加索引路由
      //   // path: '/',
      //   index: true,
      //   redirect: 'userManage',
      // },
    ],
  },
  // {
  //   path: '/login',
  //   component: () => import('@/pages/login'),
  //   meta: {
  //     title: '登陆',
  //   },
  // },
  // 404页面
  {
    path: '*',
    redirect: '/',
  },
]

export default routes
