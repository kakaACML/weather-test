import React, { useEffect, useState } from 'react'
import { Layout, message, Select, Space, Spin, Empty, Image } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import style from './index.module.less'
import './common.less'
import {
  LocationFormIPApi,
  getCityWeatherNowApi,
  getCityWeather7dApi,
  getCityWeather24hApi,
} from '@/service/api'
import dayjs from 'dayjs'
import { TO_NUMBER } from '@/enum'
import SelectComponent from '@/components/SelectComponent'
import Weather24H from '@/components/24hWeatherComponent'
import Weather7D from '@/components/7dWeatherComponent'

function Index() {
  let [cityQueryParams, setCityQueryParams] = useState<string>('')
  let [location, setLocation] = useState<any>(null)
  let [weatherNow, setWeatherNow] = useState<any>(null)
  let [weather24H, setWeather24H] = useState<any>(null)
  let [weather7D, setWeather7D] = useState<any>(null)

  // 初始化获取本地地址,更新天气
  useEffect(() => {
    getLocation()
  }, [])

  // 获取本地定位信息
  let getLocation = () => {
    LocationFormIPApi().then((res: any) => {
      const { code, data } = res
      if (code === 200) {
        const { lat, lng, country, prov, city } = data
        setCityQueryParams(`${lng},${lat}`)
        setLocation({
          ...data,
          adm1: prov,
          adm2: city,
          name: data.district || city,
        })
      } else {
        message.error('获取本地信息获取错误，请手动选择查询城市')
      }
    })
  }

  useEffect(() => {
    if (!!cityQueryParams) {
      getCityWeatherNow()
      getCityWeather24h()
      getCityWeather7d()
    }
  }, [cityQueryParams])

  // 获取城市今日天气
  let getCityWeatherNow = () => {
    getCityWeatherNowApi({ params: { location: cityQueryParams } }).then(
      (res: any) => {
        const {
          code,
          data: { now },
        } = res
        if (code === 2000) {
          setWeatherNow(now)
        } else {
          message.error('获取实时天气失败')
        }
      }
    )
  }

  // 获取城市24h天气
  let getCityWeather24h = () => {
    getCityWeather24hApi({ params: { location: cityQueryParams } }).then(
      (res: any) => {
        const {
          code,
          data: { hourly },
        } = res
        if (code === 2000) {
          setWeather24H(hourly)
        } else {
          message.error('获取24小时天气失败')
        }
      }
    )
  }
  // 获取城市7天天气
  let getCityWeather7d = () => {
    getCityWeather7dApi({ params: { location: cityQueryParams } }).then(
      (res: any) => {
        const {
          code,
          data: { daily },
        } = res
        if (code === 2000) {
          setWeather7D(daily)
        } else {
          message.error('获取近7天天气失败')
        }
      }
    )
  }

  // 获取地区信息
  let getLocationInfo = () => {
    if (!location) return null
    return (
      <Space>
        <span>
          {`${location.name === location.adm2 ? '' : location.adm2 + '-'}`}
          {`${location.adm1}-${location.country}`}
        </span>
        <span>{dayjs().format('YYYY-MM-DD')}</span>
        <span>星期{TO_NUMBER[dayjs().day()]}</span>
      </Space>
    )
  }
  let getDistrict = () => {
    if (!location) return null
    return location.name === location.adm2 ? location.adm2 : location.name
  }
  let getUpdateTime = () => {
    if (!weatherNow) return null
    const { obsTime } = weatherNow
    return `更新时间：${dayjs(obsTime).format('YYYY-MM-DD HH:mm')}`
  }
  let getWeatherImage = () => {
    if (!weatherNow) return null
    const { text } = weatherNow
    return (
      <img
        src={`/Icons/${text}.svg`}
        width={110}
        height={110}
      ></img>
    )
  }
  let getWeatherText = () => {
    if (!weatherNow) return null
    const { temp, text } = weatherNow
    return (
      <>
        <p style={{ fontSize: '50px' }}>{temp}°</p>
        <p style={{ fontSize: '22px', fontWeight: '500' }}>{text}</p>
      </>
    )
  }
  let getWeatherOther = () => {
    if (!weatherNow) return null
    let mapArray = [
      { name: 'windDir', dec: '风向' },
      { name: 'windScale', dec: '风力等级', unit: '级' },
      { name: 'humidity', dec: '相对湿度', unit: '%' },
      { name: 'temp', dec: '体感温度', unit: '°' },
      { name: 'vis', dec: '能见度', unit: 'km' },
      { name: 'precip', dec: '降水量', unit: 'mm' },
      { name: 'pressure', dec: '大气压', unit: 'hPa' },
    ]

    return mapArray.map((item: any, index: number) => {
      return (
        <div
          className={style.basicItem}
          key={index}
        >
          <p>{`${weatherNow[item.name]}${!!item.unit ? item.unit : ''}`}</p>
          <p>{item.dec}</p>
        </div>
      )
    })
  }

  return (
    <Layout className={style.layout}>
      <div className={style.main}>
        <div className={style.search}>
          <SelectComponent
            onChange={(value: string) => {
              setCityQueryParams(value)
            }}
            changeInfo={(value: any) => {
              setLocation(value)
            }}
          />
        </div>

        <div className={style.weatherMain}>
          <div className={style.weatherTitle}>
            <div className={style.titleDec}>{getLocationInfo()}</div>
            <div className={style.titleLocation}>{getDistrict()}</div>
          </div>
          <div className={style.now}>
            <div className={style.cityWeatherCurrent}>
              <div className={style.currentWeather}>
                {!!weatherNow ? (
                  <>
                    <p className={style.currentTime}>{getUpdateTime()}</p>
                    <div className={style.currentLive}>
                      <div className={style.liveImage}>{getWeatherImage()}</div>
                      <div className={style.liveText}>{getWeatherText()}</div>
                    </div>
                    <div className={style.currentBasic}>
                      {getWeatherOther()}
                    </div>
                  </>
                ) : (
                  <Empty
                    className="weatherForecast"
                    description={
                      <span style={{ color: '#ffffff8c' }}>暂无数据</span>
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div className={style.h24}>
            <Weather24H value={weather24H} />
          </div>
          <div className={style.d7}>
            <Weather7D value={weather7D} />
          </div>
        </div>
      </div>

      {/* 子路由 */}
      {/* <Content>
        <Outlet></Outlet>
      </Content> */}
    </Layout>
  )
}

export default Index
