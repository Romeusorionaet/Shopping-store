'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useMemo } from 'react'

interface Props {
  data: { title: string; stock: number }[]
  title: string
  threshold: number
}

export function GraphicBar({ data, title, threshold }: Props) {
  const minWidthPerBar = 50

  const chartWidth = useMemo(() => {
    return data.length * minWidthPerBar
  }, [data.length])

  const series = [
    {
      data: data.map((product) => product.stock),
    },
  ]

  const lowStockCount = data.filter((value) => value.stock <= threshold).length
  const offsetX = -(data.length * minWidthPerBar) / 2

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: `${title}: ${data.length}`,
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
      categories: data.map((data) => data.title),
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Quantidade',
      },
    },
    tooltip: {
      custom: function ({ dataPointIndex }) {
        const product = data[dataPointIndex]
        return (
          <div style={{ padding: '10px' }}>
            <strong>${product.title}</strong>
            <br />
            <span>Estoque: ${product.stock} unidades</span>
          </div>
        )
      },
    },
    annotations: {
      yaxis: [
        {
          y2: 0,
          y: threshold,
          opacity: 0.7,
          borderColor: '#FF4560',
          label: {
            borderColor: '#FF4560',
            offsetX,
            style: {
              color: '#fff',
              background: '#FF4560',
            },
            text: `${lowStockCount}: está abaixo do limite minímo`,
          },
        },
      ],
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
