'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useMemo } from 'react'

interface Props {
  data: { title: string; products: number }[]
  title: string
}

export function GraphicBarCategoryProducts({ data, title }: Props) {
  const minWidthPerBar = 50

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.products - a.products)
  }, [data])

  const chartWidth = useMemo(() => {
    return sortedData.length * minWidthPerBar
  }, [sortedData.length])

  const series = [
    {
      data: sortedData.map((category) => category.products),
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
      text: `${title}: total de ${sortedData.length} categorias`,
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
      categories: sortedData.map((category) => category.title),
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Categorias',
      },
    },
    tooltip: {
      custom: function ({ dataPointIndex }) {
        const category = sortedData[dataPointIndex]
        return `<div style={{ padding: '10px' }}>
                  <strong>${category.title}</strong>
                  <br />
                  <span>${category.products} produtos</span>
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
