/**
 * @description: 响应码
 */
export enum RESPONSE_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 请求成功
  BAD_REQUEST = 400, // 请求错误
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 资源未找到
  INTERNAL_SERVER_ERROR = 500, // 服务器错误
}

/**
 * @description: 请求提示语
 */
export enum RESPONSE_MSG {
  SUCCESS = '请求成功',
  FAILURE = '请求失败',
}

/**
 * @description: 重置状态码
 */
// const REPLACE_RESPONSE_CODE
export const REPLACE_RESPONSE_CODE = {
  200: '2000',
  400: '4000',
  401: '4001',
  403: '4003',
  404: '4004',
  500: '5000',
  501: '5001',
};

/**
 * 和风密钥
 */

export const HEFENG_KEY = '0bf09fdddeaf4b598ef2da052773f3f4';
