import React, { useEffect, useState } from 'react'
import { Layout, message, Select, Space, Spin, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { getCityListApi } from '@/service/api'
import { debounceFunction } from '@/utils/index'

function index(props: any) {
  const { value, onChange, changeInfo } = props
  let [cityQueryParams, setCityQueryParams] = useState<string>('')
  let [cityList, setCityList] = useState<any[]>([])
  let [isFetching, setIsFetching] = useState(false)

  let getCityList = (param: string) => {
    setIsFetching(true)
    setCityList([])
    getCityListApi({ params: { location: param } }).then((res: any) => {
      const { data, code, msg } = res
      if (code === 2000) {
        const { location } = data
        setCityList(location)
        setIsFetching(false)
      } else {
        setIsFetching(false)
        message.error(msg)
      }
    })
  }

  // 防抖查询
  let debounceGetList = debounceFunction(getCityList, 800)

  const handleSearch = (newValue: string) => {
    if (!newValue) return
    debounceGetList(newValue)
  }

  const handleChange = (newValue: string, option: any) => {
    setCityQueryParams(newValue)
    onChange(newValue)
    changeInfo(option._d)
  }
  return (
    <Select
      showSearch
      value={cityQueryParams}
      placeholder={'xxxxxxxx'}
      style={{ width: '100%', textAlign: 'left', height: 30 }}
      defaultActiveFirstOption={false}
      suffixIcon={<SearchOutlined style={{ color: '#ffffff8c' }} />}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={isFetching ? <Spin size="small" /> : <Empty />}
      options={(cityList || []).map((d) => ({
        value: d.id,
        label:
          d.adm2 === d.name
            ? `${d.country}-${d.adm1}-${d.adm2}`
            : `${d.country}-${d.adm1}-${d.adm2}-${d.name}`,
        _d: d,
      }))}
    />
  )
}

export default index
