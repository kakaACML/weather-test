import { message } from 'antd'

// 防抖函数
function debounceFunction(func: Function, delay: number) {
  let timer: any = null
  return function (...args: any) {
    // const context = this
    // const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // func.apply(context, args)
      func(args)
    }, delay)
  }
}

export { debounceFunction }
