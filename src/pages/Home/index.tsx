import * as echarts from "echarts";
import { useEffect, useRef } from "react";
type EChartsOption = echarts.EChartsOption;

const Home = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 保证DOM可用才进行图表的渲染，所以基本echarts的初始化都是在useEffect中进行
    // 1. 获取渲染图标的dom节点
    const chartDom = chartRef.current;
    // 2. 图标初始化生成图表实例对象
    const myChart = echarts.init(chartDom);
    // 3. 准备图表参数
    const option: EChartsOption = {
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150],
          type: "bar",
        },
      ],
    };
    // 4. 使用图表参数完成渲染
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div ref={chartRef} style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Home;
