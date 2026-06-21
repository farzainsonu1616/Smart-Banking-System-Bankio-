import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const ChartWidget = ({ type = 'bar', data, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-3 shadow-sm h-100" style={{ minHeight: '300px' }}>
      {type === 'bar' ? (
        <Bar options={options} data={data} />
      ) : (
        <Doughnut options={options} data={data} />
      )}
    </div>
  )
}

export default ChartWidget
