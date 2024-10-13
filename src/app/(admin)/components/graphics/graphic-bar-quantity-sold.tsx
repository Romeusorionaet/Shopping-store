'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

interface Props {
  data: { title: string; quantitySold: number }[]
  title: string
  category: string
}

export function GraphicBarQuantitySold({ data, title, category }: Props) {
  const minWidthPerBar = 50

  const sortedData = [...data].sort((a, b) => b.quantitySold - a.quantitySold)

  const chartWidth = sortedData.length * minWidthPerBar

  const series = [
    {
      data: sortedData.map((product) => product.quantitySold),
    },
  ]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: `${title}: total de ${sortedData.length} da categoria ${category}`,
      align: 'left',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: sortedData.map((product) => product.title),
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Vendas',
      },
    },
    tooltip: {
      custom: function ({ dataPointIndex }) {
        const product = sortedData[dataPointIndex]
        return `<div style="padding: 10px;">
                  <strong>${product.title}</strong><br/>
                  <span>Vendido: ${product.quantitySold} unidades</span>
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
    <div className="scrollbar w-full overflow-x-auto rounded-lg bg-blue-50 p-4">
      <div style={{ width: `${chartWidth}px` }}>
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  )
}
