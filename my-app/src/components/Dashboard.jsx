import React, { useState, useEffect } from 'react';
import StatusBlock from './StatusBlock';
import GroupsBlock from './GroupsBlock';
import NodesBlock from './NodesBlock';
import MetricsBlock from './MetricsBlock';
import InterfaceBlock from './InterfaceBlock';
import AdminBlock from './AdminBlock';
import AppsBlock from './AppsBlock';
import { fetchDashboardData } from '../utils/api';
import '../styles/dashboard.scss';

const Dashboard = () => {
  const [data, setData] = useState({
    groups: [],
    nodes: [],
    metrics: [],
    interfaces: [],
    users: [],
    groups_nodes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // Загрузка данных
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchDashboardData();
      
      // Обогащаем ноды данными о группах
      const nodesWithGroups = result.nodes.map(node => ({
        ...node,
        groups: result.groups_nodes
          .filter(gn => gn.node_id === node.id)
          .map(gn => gn.group_id)
      }));

      setData({
        ...result,
        nodes: nodesWithGroups
      });
    } catch (err) {
      console.error('Dashboard load error:', err);
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Фильтрация нод по выбранной группе
  const filteredNodes = selectedGroup
    ? data.nodes.filter(node => node.groups && node.groups.includes(selectedGroup))
    : data.nodes;

  // Получение данных администратора
  const getAdminData = () => {
    if (!selectedNode || !selectedNode.admin) return null;
    return data.users.find(user => user.id === selectedNode.admin);
  };

  // Получение интерфейсов для выбранной ноды
  const getNodeInterfaces = () => {
    if (!selectedNode) return [];
    return data.interfaces.filter(intf => intf.node_id === selectedNode.id);
  };

  if (loading) return <div className="dashboard-loading">Загрузка данных...</div>;
  if (error) return <div className="dashboard-error">Ошибка: {error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-column">
        <StatusBlock 
          nodes={data.nodes} 
          selectedGroup={selectedGroup} 
        />
        <GroupsBlock
          groups={data.groups}
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
        />
      </div>

      <div className="dashboard-column">
        <NodesBlock
          nodes={filteredNodes}
          onSelectNode={setSelectedNode}
          selectedNode={selectedNode}
        />
      </div>

      <div className="dashboard-column">
        {selectedNode && (
          <>
            <InterfaceBlock interfaces={getNodeInterfaces()} />
            <AdminBlock admin={getAdminData()} />
            <AppsBlock nodeId={selectedNode?.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;