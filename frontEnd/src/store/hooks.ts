/**
 * 标注过类型的钩子
 * 定义全局react-redux中{useDispatch useSelector}的类型
 * 尽管可以将 RootState 和 AppDispatch 类型导入每个组件, 更好的方式是创建 useDispatch 和 useSelector 钩子的类型定义，以便在你的应用程序中全局使用
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
