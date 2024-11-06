import React from 'react'
import { Empty } from 'antd'
import dayjs from 'dayjs'
import { TO_NUMBER } from '@/enum'
import './index.less'

// 获取温度比例
const getRatio = (temp: string | number) => {
  // 温度范围
  let tempRang = [-30, 30]
  let scope = tempRang[1] - tempRang[0]

  // 当前温度长度
  let lengthOfTemp = Number(temp) - tempRang[0]

  // 当前温度占比
  let ratioOfTemp = lengthOfTemp / scope

  let ration = 100 - Number((ratioOfTemp * 100).toFixed(2))

  return `${ration}%`
}

const getMonth = (dataTime: any) => {
  let now = dayjs().format('YYYY-MM-DD')
  let _now = dataTime.format('YYYY-MM-DD')

  if (now === _now) {
    return '今天'
  }
  return `周${TO_NUMBER[dataTime.day()]}`
}

function index(props: any) {
  const { value } = props
  const getItem = () => {
    if (!value) return null

    return value.map((item: any, index: number) => {
      const { fxDate, textDay, tempMax, tempMin } = item

      const dataTime = dayjs(fxDate)
      return (
        <div
          className="Item7d"
          key={index}
        >
          <div className="Title7d">
            <div className="data">
              <p>{getMonth(dataTime)}</p>
              <p>{`${dataTime.month() + 1}月${dataTime.date()}日`}</p>
            </div>
            <div className="Image7d">
              <img src={`/Icons/${textDay}.svg`}></img>
            </div>
          </div>
          <div
            className="Temp7d"
            style={{ width: '100%' }}
          >
            <div
              className="space"
              style={{ flex: `0 0 ${getRatio(tempMax)}` }}
            ></div>
            <div className="tmp-cont">
              <span className="temp">{tempMax}°</span>
              <div className="tmpLine"></div>
              <span className="temp last">{tempMin}°</span>
            </div>
            <div
              className="space"
              style={{
                flex: `0 0 ${getRatio(tempMin)}`,
              }}
            ></div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="main7d">
      <h1>未来7天天气</h1>

      {!!value ? (
        <div className="weatherForecast">{getItem()}</div>
      ) : (
        <Empty
          className="weatherForecast"
          description={<span style={{ color: '#ffffff8c' }}>暂无数据</span>}
        />
      )}
    </div>
  )
}

export default index
