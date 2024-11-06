import { configureStore } from "@reduxjs/toolkit";
import testReducer from './testSlice'

const store =  configureStore({
  reducer: {
    test:testReducer
  }
})

// 类型导出
// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出 dispatch 类型（包含中间类型）: 
export type AppDispatch = typeof store.dispatch


// 全局状态导出 
export default store

