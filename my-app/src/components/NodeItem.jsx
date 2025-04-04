import React from 'react';
import '../styles/NodeItem.scss';

const NodeItem = ({ node, metrics, onClick }) => {
  const getMetricColor = (value) => {
    if (value > 95) return '#ff4d4f';
    if (value > 85) return '#faad14';
    return '#52c41a';
  };

  const getStatusColor = (status) => {
    const colors = {
      critical: '#ff4d4f',
      warning: '#faad14',
      normal: '#52c41a'
    };
    return colors[status] || '#d9d9d9';
  };

  return (
    <div className="node-item" onClick={onClick}>
      <div className="node-header">
        <h4>{node.name}</h4>
        <span 
          className="status-indicator"
          style={{ backgroundColor: getStatusColor(node.status) }}
        />
      </div>
      
      {metrics && (
        <div className="node-metrics">
          <div className="metric">
            <span>CPU:</span>
            <span style={{ color: getMetricColor(metrics.cpu_utilization) }}>
              {metrics.cpu_utilization}%
            </span>
          </div>
          <div className="metric">
            <span>Memory:</span>
            <span style={{ color: getMetricColor(metrics.memory_utilization) }}>
              {metrics.memory_utilization}%
            </span>
          </div>
          <div className="metric">
            <span>Disk:</span>
            <span style={{ color: getMetricColor(metrics.disk_utilization) }}>
              {metrics.disk_utilization}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NodeItem;