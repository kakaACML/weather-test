// @ts-ignore
import request from '@/service/request'

// 获取本地ip定位
export function LocationFormIPApi() {
  // return request('https://qifu-api.baidubce.com/ip/local/geo/v1/district')
  return request('https://api.qjqq.cn/api/Local')
}

// 获取城市列表
export function getCityListApi(opt: any) {
  return request('http://localhost:3000/cityQuery/list', { ...opt })
}

// 获取城市实时天气
export function getCityWeatherNowApi(opt: any) {
  return request('http://localhost:3000/weatherQuery/realTime', { ...opt })
}

// 获取城市24h天气
export function getCityWeather24hApi(opt: any) {
  return request('http://localhost:3000/weatherQuery/24h', { ...opt })
}

// 获取城市近7天天气
export function getCityWeather7dApi(opt: any) {
  return request('http://localhost:3000/weatherQuery/7d', { ...opt })
}
