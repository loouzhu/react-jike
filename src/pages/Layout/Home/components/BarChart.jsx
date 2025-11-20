// 柱状图组件
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
// 把可变的部分都抽象成prop参数
const BarChart = ({ title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 保证dom可用才渲染
    // 获取需要渲染的dom结点
    const chartDom = chartRef.current;
    // 初始化实例对象
    const myChart = echarts.init(chartDom);
    // 图标参数
    const option = {
      title: {
        text: title,
      },
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
    // 添加清理函数
    return () => {
      myChart.dispose(); // 销毁实例
    };
  }, [title]); // 添加依赖数组，只有 title 变化时才重新执行
  return (
    // 如果要使用Echarts，一定要指定宽高而且这个盒子不能有其他内容
    <div>
      <div ref={chartRef} style={{ width: 600, height: 400 }}></div>
    </div>
  )
}

export default BarChart