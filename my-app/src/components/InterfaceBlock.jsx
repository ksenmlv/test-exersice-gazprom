import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api'; 
import '../styles/InterfaceBlock.scss';

const InterfaceBlock = () => {
  const [interfaces, setInterfaces] = useState([]);

  useEffect(() => {
    const loadInterfaces = async () => {
      try {
        const data = await fetchApi('/api/interfaces'); 
        setInterfaces(data);
      } catch (error) {
        console.error('Failed to load interfaces:', error);
        setInterfaces([]);
      } 
    };

    loadInterfaces();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      up: '#52c41a',
      down: '#ff4d4f',
      warning: '#faad14'
    };
    return colors[status] || '#d9d9d9';
  };

  if (interfaces.length === 0) {
    return (
      <div className="interface-block">
        <h3>Интерфейсы</h3>
        <p>Нет данных об интерфейсах</p>
      </div>
    );
  }

  return (
    <div className="interface-block">
      <h3>Интерфейсы</h3>
      {interfaces.map(intf => (
        <div key={intf.id} className="interface-item">
          <span className="interface-name">{intf.caption}</span>
          <span
            className="interface-status"
            style={{ backgroundColor: getStatusColor(intf.status) }}
          >
            {intf.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default InterfaceBlock;
