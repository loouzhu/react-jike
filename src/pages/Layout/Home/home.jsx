import React from 'react'
import BarChart from './components/BarChart'

export default function Home() {
  return (
    // 如果要使用Echarts，一定要指定宽高而且这个盒子不能有其他内容
    <div>
      <div>
        <BarChart title={'三大框架满意度'} />
      </div>
    </div>

  )
}
