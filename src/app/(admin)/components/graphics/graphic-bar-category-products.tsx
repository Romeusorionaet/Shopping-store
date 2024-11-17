'use client'

import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(
  () => import('react-apexcharts').then((mod) => mod.default),
  { ssr: false },
)

interface Props {
  data: { title: string; productCount: number }[]
  title: string
}

export function GraphicBarCategoryProducts({ data, title }: Props) {
  const minWidthPerBar = 50

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.productCount - a.productCount)
  }, [data])

  const chartWidth = useMemo(() => {
    return sortedData.length * minWidthPerBar
  }, [sortedData.length])

  const colors = sortedData.map((category) =>
    category.productCount <= 3 ? '#FF0000' : '#3498db',
  )

  const series = [
    {
      data: sortedData.map((category) => category.productCount),
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
      text: `${title}: ${sortedData.length}`,
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
                  <span>${category.productCount} produtos</span>
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
    colors,
  }

  return (
    <div className="scrollbar w-full overflow-x-auto rounded-lg bg-blue-50 p-4">
      <div style={{ width: `${chartWidth}px` }}>
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  )
}
