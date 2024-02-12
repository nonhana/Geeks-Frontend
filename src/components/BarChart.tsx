// src/components/BarChart.tsx
// 二次封装Echarts-柱状图
// 1. 把功能代码都放到这个组件中
// 2. 把可变的参数部分抽象成props

import * as echarts from "echarts";
import React, { useEffect, useRef } from "react"; // 确保React被导入，以便在文件中使用JSX
type EChartsOption = echarts.EChartsOption;

// 定义一个接口来描述props的结构和类型
interface BarChartProps {
  title: string; // 明确地声明title是一个字符串类型
  categories: string[];
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ title, categories, data }) => {
  // 使用定义好的接口作为泛型参数传递给React.FC
  const chartRef = useRef<HTMLDivElement | null>(null); // 明确地声明chartRef是对HTMLDivElement的引用，初始值为null

  useEffect(() => {
    if (chartRef.current) {
      // 检查chartRef.current是否存在
      const chartDom = chartRef.current;
      const myChart = echarts.init(chartDom);
      const option: EChartsOption = {
        title: {
          text: title,
        },
        xAxis: {
          type: "category",
          data: categories,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data,
            type: "bar",
          },
        ],
      };
      myChart.setOption(option);
    }
  }, [title, categories, data]); // 把title加入到依赖项数组中，这样只要title变化，就会重新执行effect

  return <div ref={chartRef} style={{ width: "500px", height: "400px" }}></div>;
};

export default BarChart;
