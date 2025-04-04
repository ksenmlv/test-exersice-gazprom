import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import '../styles/MetricsBlock.scss';

Chart.register(...registerables);

const MetricsBlock = ({ metrics, selectedNode }) => {
  if (!selectedNode) return (
    <div className="metrics-block">Выберите ноду для просмотра метрик</div>
  );

  // Фильтруем метрики для выбранной ноды
  const nodeMetrics = metrics.filter(m => m.node_id === selectedNode.id)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  const data = {
    labels: nodeMetrics.map(m => new Date(m.datetime).toLocaleTimeString()),
    datasets: [
      {
        label: 'Использование CPU',
        data: nodeMetrics.map(m => m.cpu_utilization),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Использование памяти',
        data: nodeMetrics.map(m => m.memory_utilization),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Использование диска',
        data: nodeMetrics.map(m => m.disk_utilization),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Метрики ноды ${selectedNode.caption}`,
      },
    },
  };

  return (
    <div className="metrics-block">
      <Line options={options} data={data} />
    </div>
  );
};

export default MetricsBlock;