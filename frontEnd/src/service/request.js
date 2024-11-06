/**
 *
 * fetch封装
 */

import {
  createFetchParams,
  getParamsToUrlEncode,
  getLocalApiUrl,
} from './common'

/**
 *
 * @param {*} url
 * @param {*} op :{ method?:'get'|'post'|'put'|'delete', params?: formData|Object }
 * @returns
 */
const request = async (url, op) => {
  try {
    const options = op || {}

    const method = options.method
    const params = options.params || {}

    let proxyUrl = url

    let _method = (!!method ? method.toUpperCase() : '') || 'GET'

    // 方法为get且params有值时 构建url请求连接
    proxyUrl = getParamsToUrlEncode(_method, params, proxyUrl)

    // 创建非get请求头
    const fetchParams = createFetchParams({ method: _method, params })

    const response = await window.fetch(proxyUrl, fetchParams)

    // response.json 返回值为promise
    const data = await response.json()

    // 示例：与后端自定义的状态码
    const loginoutCodes = [
      '403', // 没有权限
      '421', // 您的登录状态已经失效,请重新登录
      '422', // 当前账号已有其他人使用，您被退出，请检查账号信息或联系管理员
      '423', // 没有登录
      '426', // 您的账号权限被修改，请重新登录
      '427', // 无效令牌
    ]

    // 自定义请求失败(非2xx开头的状态码)返回结果
    if (!response.ok) {
      // 可以处理特殊状态如404/500 或者权限问题

      return { ...data }
      // return {
      //   status: response.status,
      //   data,
      //   headers: response.headers,
      //   url: response.url,
      //   error: '错误',
      // }
    } else {
      // 自定义请求成功(如200)返回结果
      return { ...data }
    }
  } catch (err) {
    // 自定义请求异常错误返回结果
    return {
      data: err,
    }
  }
}

export default request
