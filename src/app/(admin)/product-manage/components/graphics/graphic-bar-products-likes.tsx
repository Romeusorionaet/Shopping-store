'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

interface Props {
  data: { title: string; like: number }[]
  title: string
  category: string
}

export function GraphicBarProductsLikes({ data, title, category }: Props) {
  const minHeightPerBar = 50

  const sortedData = [...data].sort((a, b) => b.like - a.like)

  const chartHeight = sortedData.length * minHeightPerBar

  const series = [
    {
      data: sortedData.map((product) => product.like),
    },
  ]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: chartHeight,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: `${title}: ${sortedData.length} da categoria ${category}`,
      align: 'left',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      title: {
        text: 'Likes',
      },
      categories: sortedData.map((product) => product.title),
      labels: {
        rotate: 0,
      },
    },
    tooltip: {
      custom: function ({ dataPointIndex }) {
        const product = sortedData[dataPointIndex]
        return `<div style="padding: 10px;">
                  <strong>${product.title}</strong><br/>
                  <span>Likes: ${product.like}</span>
                </div>`
      },
    },
    legend: {
      show: false,
    },
    grid: {
      padding: {
        right: 20,
      },
    },
  }

  return (
    <div
      className="scrollbar w-full overflow-y-auto rounded-lg bg-blue-50 p-4"
      style={{ height: '500px' }}
    >
      <div style={{ height: `${chartHeight}px` }}>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={chartHeight}
        />
      </div>
    </div>
  )
}
