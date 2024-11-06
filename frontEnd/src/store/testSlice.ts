import { createSlice,PayloadAction,createAsyncThunk,createSelector } from "@reduxjs/toolkit";

// 引入类型 全局store和dispatch类型
import type { RootState, AppDispatch } from './index'


// 为 slice state 定义一个类型
interface testState {
  value: number,
 // 多个可能的状态枚举值
 status: 'idle' | 'loading' | 'succeeded' | 'failed',
 error?: string | null| undefined
}

const initialState:testState = {
  value: 0,
  status: 'idle',
  error:null
}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    // 生成的 action creator 将根据你为 reducer 提供的 PayloadAction<T> 类型来校验 payload 参数类型的正确性。
    incrementByAmount: (state, action:PayloadAction<number>) => {
      state.value += action.payload
    },  
    // 编写 reducer 时定义一个 prepare 函数。 prepare 函数可以接受多个参,更具参数自定义生成payload格式，不用在调用该action时手动组装payload格式
    incrementByAmountToPrepare: {
      reducer: (state, action: PayloadAction<number>) => {
        state.value += action.payload
      },
      prepare: (amount) => {
        // 自动生出payload格式
        console.log('组装payload格式');
        
        return {
          payload:amount
        }
      }
    }
  },
  // extraReducers响应 没有 定义到该 slice 的 reducers 字段中的 action。如由createAsyncThunk产生的默认action
  extraReducers(builder) {
    builder
      .addCase(incrementByCreateAsyncThunk.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(incrementByCreateAsyncThunk.fulfilled, (state, action:{payload:any}) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.value +=  action.payload
      })
      .addCase(incrementByCreateAsyncThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

// 分组store导出
export default testSlice.reducer


//  返回action生成函数
export const { increment, decrement, incrementByAmount,incrementByAmountToPrepare } = testSlice.actions

// 数据提取函数 , 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectTest = (state: RootState) => state.test.value
export const selectTestStatus = (state: RootState) => state.test.status

// 创建selector的缓存值
// createSelector将一个或多个“输入 selector ”函数作为参数，外加一个“输出 selector ”函数。;
// 只有在输入参数中的selector变化时，输入selector变化时，才会重新执行输出 selector
// export const selectPostsByUser = createSelector(
//   [selector1, selector2,....],
//   (select1Result, selector2Result,....) => {根据select1Result和selector2Result返回新值或者缓存值}
// )


// 自定义异步action
// 下面这个函数就是一个 thunk ，它使我们可以执行异步逻辑
// 你可以 dispatched 异步 action `dispatch(incrementAsync(10))` 就像一个常规的 action,调用 thunk 时接受 `dispatch` 函数作为第一个参数,当异步代码执行完毕时，可以 dispatched actions
// 注意：自定义异步，需要自己封装异步过程中状态的action（如异步开始状态，异步完成状态，异步错误状态，下面函数只封装了异步完成状态），方便UI组件使用状态，呈现不同UI效果。
export const incrementAsync = (amount:number) => (dispatch:AppDispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

// 利用createAsyncThunk 生成异步：通过生成 action type 和 action creator 并生成一个自动 dispatch 这些 action 的 thunk。你提供一个回调函数来进行异步调用，并把结果数据返回成 Promise，并生成异步过程中状态的action。
// 如下示例：
// 可能会生成一下action: 'async/getTestValue/pending','async/getTestValue/fulfilled','async/getTestValue/reject'
// 需要使用builder.addCase(actionCreator, reducer) 来处理异步 thunk dispatch 的每个 action。
/**
 * createAsyncThunk 接收 2 个参数:
 * 将用作生成的 action 类型的前缀的字符串
 * 一个 “payload creator” 回调函数，它应该返回一个包含一些数据的 Promise，或者一个被拒绝的带有错误的 Promise
 */
export const incrementByCreateAsyncThunk = createAsyncThunk('test/async/getTestValue', async () => {
  // 异步请求
  // const response = await client.get('/fakeApi/posts')
  // return response.data

  // 异步请求
  // const data = await Promise.resolve(10)

  const data = await new Promise((res,rej) => {
    setTimeout(()=>res(10),2000)
  })
  return data
})


/**
 * 更多redux/toolkit和react-redux功能查看文档：
 * https://cn.redux.js.org/
 * 如：redux/toolkit: RTK Query查询，RTK Query 是一个强大的数据获取和缓存工具，简化redux很多模版代码。
 * 
 * react-query也可进行数据API请求并缓存：不同于RTK Query，react-query它的主要功能是处理服务器和客户端之间的功能。可以独立使用；
 * Redux 处理客户端状态。Redux 可用于异步存储数据。RTK Query深入绑定于Redux，利用Redux保存异步请求的数据。
 */






