import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import './index.less'
import { SendOutlined } from '@ant-design/icons'
import { Empty } from 'antd'

function index(props: any) {
  const { value } = props

  let convertDateTimeToAmPm = (dateTime: any) => {
    const hour = dateTime.hour()
    if (hour >= 0 && hour < 12) {
      return `${hour}am`
    } else if (hour === 12) {
      return `${hour}pm`
    } else {
      return `${hour - 12}pm`
    }
  }

  useEffect(() => {
    if (!value) return

    let filterData = value.filter((item: any, index: number) => index % 2 === 0)

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echarts24H'))

    /** @type EChartsOption */
    let option = {
      tooltip: {
        show: false,
      },
      xAxis: {
        show: false,
        data: filterData.map((item: any) => {
          let dateTime = dayjs(item.fxTime)
          return convertDateTimeToAmPm(dateTime)
        }),
        axisLabel: {
          show: false,
          onZero: false,
        },
        axisTick: {
          show: false,
        },
        boundaryGap: false,
      },
      yAxis: {
        show: false,
      },
      grid: {
        left: 0,
        right: 20,
        top: 20,
        bottom: 0,
        containLabel: true,
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: '',
          type: 'bar',
          data: filterData.map((item: any) => Number(item.temp) + 20),
          barWidth: 20,
          itemStyle: {
            borderRadius: 10,
            color: '#427bff',
          },
          label: {
            show: true,
            formatter: (param: any) => {
              const { value } = param
              return `${value - 20}°`
            },
            color: '#fff',
            position: 'top',
            fontSize: 18,
            textBorderWidth: 0,
            textBorderColor: null,
          },
        },
      ],
    }

    // 绘制图表
    myChart.setOption(option)

    window.addEventListener('resize', function () {
      myChart.resize()
    })
  }, [value])

  let getTempInfo = () => {
    if (!value) return null

    return value
      .filter((item: any, index: number) => index % 2 === 0)
      .map((item: any, index: number) => {
        const { text, fxTime, wind360 } = item
        let dateTime = dayjs(fxTime)
        return (
          <div
            key={index}
            className="hour24Item"
          >
            <img
              src={`/Icons/${text}.svg`}
              width={30}
              height={30}
              style={{ padding: 4 }}
            ></img>
            <SendOutlined
              style={{ padding: 5, color: '#ffffff80' }}
              rotate={Number(-90 + Number(wind360))}
            />
            <span>{convertDateTimeToAmPm(dateTime)}</span>
          </div>
        )
      })
  }
  return (
    <div className="mian24H">
      <h1>24小时天气</h1>
      {!!value ? (
        <div>
          <div
            id="echarts24H"
            style={{
              width: '100%',
              height: '400px',
            }}
          ></div>
          <div className="hour24">{getTempInfo()}</div>
        </div>
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
