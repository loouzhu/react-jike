import React from 'react'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default function Home() {
  const chartRef = useRef(null);

  useEffect(() => {
    // 保证dom可用才渲染
    // 获取需要渲染的dom结点
    const chartDom = chartRef.current;
    // 初始化实例对象
    const myChart = echarts.init(chartDom);
    // 图标参数
    const option = {
      xAxis: {
        type: 'category',
        data: ['React', 'Vue', 'Angular']
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  })
  return (
    // 如果要使用Echarts，一定要指定宽高而且这个盒子不能有其他内容
    <div>
      <div ref={chartRef} style={{ width: 600, height: 400 }}></div>
      <div>1</div>
    </div>

  )
}
