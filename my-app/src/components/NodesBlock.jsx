import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';
import '../styles/NodesBlock.scss';

const NodesBlock = ({ nodes = [], onSelectNode = () => {}, selectedNode = null }) => {
  const [metricsData, setMetricsData] = useState({});

  // Загружаем метрики для всех нод при монтировании
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchApi('/api/metrics');
        const metricsByNode = {};
        
        data.forEach(metric => {
          if (!metricsByNode[metric.node_id]) {
            metricsByNode[metric.node_id] = [];
          }
          metricsByNode[metric.node_id].push(metric);
        });

        setMetricsData(metricsByNode);
      } catch (error) {
        console.error('Ошибка загрузки метрик:', error);
      }
    };

    loadMetrics();
  }, []);

  // Функция для определения цвета метрики
  const getMetricColor = (value) => {
    if (value === null || value === undefined) return '#d9d9d9';
    if (value > 95) return '#ff4d4f';
    if (value > 85) return '#faad14';
    return '#52c41a';
  };

  // Функция для определения цвета статуса
  const getStatusColor = (status) => {
    const colors = {
      critical: '#ff4d4f',
      warning: '#faad14',
      normal: '#52c41a',
      unknown: '#d9d9d9'
    };
    return colors[status] || colors.unknown;
  };

  // Получение последних метрик для ноды
  const getLastMetrics = (nodeId) => {
    if (!metricsData[nodeId] || !metricsData[nodeId].length) return null;
    
    return metricsData[nodeId].reduce((latest, metric) => {
      return new Date(metric.datetime) > new Date(latest.datetime) 
        ? metric 
        : latest;
    });
  };

  return (
    <div className="nodes-block">
      <h3>Ноды</h3>
      <div className="nodes-list">
        {nodes.length > 0 ? (
          nodes.map(node => {
            const lastMetrics = getLastMetrics(node.id);
            const isSelected = selectedNode && selectedNode.id === node.id;
            
            return (
              <div
                key={node.id}
                className={`node-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectNode(node)}
              >
                <div className="node-header">
                  <h4>{node.caption || 'Без названия'}</h4>
                  <span
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(node.status) }}
                    title={node.status}
                  />
                </div>

                {lastMetrics ? (
                  <div className="node-metrics">
                    <div className="metric-row">
                      <span>CPU:</span>
                      <span style={{ color: getMetricColor(lastMetrics.cpu_utilization) }}>
                        {lastMetrics.cpu_utilization ?? 'N/A'}%
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>Память:</span>
                      <span style={{ color: getMetricColor(lastMetrics.memory_utilization) }}>
                        {lastMetrics.memory_utilization ?? 'N/A'}%
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>Диск:</span>
                      <span style={{ color: getMetricColor(lastMetrics.disk_utilization) }}>
                        {lastMetrics.disk_utilization ?? 'N/A'}%
                      </span>
                    </div>
                    <div className="metric-time">
                      Обновлено: {new Date(lastMetrics.datetime).toLocaleTimeString()}
                    </div>
                  </div>
                ) : (
                  <div className="no-metrics">Нет данных метрик</div>
                )}
              </div>
            );
          })
        ) : (
          <div className="no-nodes">Нет доступных нод</div>
        )}
      </div>
    </div>
  );
};

export default NodesBlock;