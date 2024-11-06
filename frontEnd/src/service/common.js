// 是否为空对象
export function isNullObject(obj) {
  return typeof obj === 'object' && !!Object.keys(obj).length
}

// 将对象请求参数转为url查询参数
export function getParamsToUrlEncode(method, params, url) {
  // 方法为get且params有值时 构建url请求连接
  if ((!method || method.toUpperCase() === 'GET') && isNullObject(params)) {
    Object.keys(params).map((key, index) => {
      if (!index) {
        url += `?${key}=${encodeURIComponent(params[key])}`
      } else {
        url += `&${key}=${encodeURIComponent(params[key])}`
      }
    })
  }
  return url
}

// 创建请求参数
export function createFetchParams({ method, params }) {
  let _params = { method }
  _params.headers = createHeader()
  if (method === 'POST' || method === 'PUT') {
    if (params instanceof FormData) {
      _params.body = params
    } else {
      _params.body = JSON.stringify(params)
      _params.headers['Content-Type'] = 'application/json'
    }
  }
  return _params
}

// 创建header头部:添加公共字段如 token 等
export function createHeader() {
  let headers = {}
  return headers
}

// 根据localConfig.json 配置的api地址，修改请求地址
export function getLocalApiUrl(url) {
  let baseUrl = window.globalConfig?.api || ''
  return `${baseUrl}${url}`
}
