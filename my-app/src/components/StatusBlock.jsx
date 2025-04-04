import React, { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';
import '../styles/StatusBlock.scss';

const StatusBlock = ({ nodes = [], selectedGroup = null }) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default statuses that match your table structure
  const defaultStatuses = [
    { id: 1, color: 'black', description: 'UNREACHABLE' },
    { id: 2, color: 'grey', description: 'SHUTDOWN' },
    { id: 3, color: 'lightgreen', description: 'UP' },
    { id: 4, color: 'yellow', description: 'WARNING' },
    { id: 5, color: 'red', description: 'CRITICAL' },
    { id: 6, color: 'darkred', description: 'DOWN' }
  ];

  // Load statuses from DB on mount
  useEffect(() => {
    const loadStatuses = async () => {
      try {
        const data = await fetchApi('/api/statuses');
        // Make sure we have all required fields
        const formattedStatuses = data.map(status => ({
          id: status.Id,
          color: status.color,
          description: status.description
        }));
        setStatuses(formattedStatuses);
      } catch (error) {
        console.error('Failed to load statuses:', error);
        setStatuses(defaultStatuses);
      } finally {
        setLoading(false);
      }
    };

    loadStatuses();
  }, []);

  // Filter nodes by selected group
  const filteredNodes = selectedGroup
    ? nodes.filter(node => node.groups && node.groups.includes(selectedGroup))
    : nodes;

  // Determine the worst status (priority: 6-DOWN is worst, 3-UP is best)
  const getWorstStatus = () => {
    if (!filteredNodes.length || loading || !statuses.length) {
      return null;
    }

    // Find the highest priority status (lower numbers are worse)
    const worstStatusId = filteredNodes.reduce((worstId, node) => {
      // Assuming node.status contains the status ID
      if (!node.status) return worstId;
      return node.status > worstId ? node.status : worstId;
    }, 0);

    return statuses.find(s => s.id === worstStatusId) || 
           statuses.find(s => s.id === 3) || // Default to UP if not found
           { id: 0, description: 'UNKNOWN', color: 'grey' };
  };

  const currentStatus = getWorstStatus();

  if (loading) {
    return (
      <div className="status-block loading">
        <h3>Service Status</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="status-block"
      style={{ backgroundColor: currentStatus?.color || 'grey' }}
    >
      <h3>Service Status</h3>
      <div className="status-content">
        <span className="status-label">
          {currentStatus?.description || 'NO DATA'}
        </span>
        <span className="nodes-count">
          <br/>{filteredNodes.length} nodes
        </span>
      </div>
    </div>
  );
};

export default StatusBlock;