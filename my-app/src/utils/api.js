import { API_CONFIG } from '../config';

const buildUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;

  try {
    data = contentType?.includes('application/json') 
      ? await response.json()
      : await response.text();
  } catch (error) {
    throw new Error(`Failed to parse response: ${error.message}`);
  }

  if (!response.ok) {
    const error = new Error(data.message || `HTTP error! status: ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const fetchApi = async (endpoint, options = {}) => {
  const url = buildUrl(endpoint);
  
  try {
    console.log(`[API] Request to: ${url}`);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`[API] Request failed to ${url}:`, error);
    throw new Error(`Network error: ${error.message}`);
  }
};

// Специализированные методы API
export const fetchGroups = () => fetchApi(API_CONFIG.ENDPOINTS.GROUPS);
export const fetchNodes = () => fetchApi(API_CONFIG.ENDPOINTS.NODES);
export const fetchMetrics = () => fetchApi(API_CONFIG.ENDPOINTS.METRICS);
export const fetchInterfaces = () => fetchApi(API_CONFIG.ENDPOINTS.INTERFACES);
export const fetchUsers = () => fetchApi(API_CONFIG.ENDPOINTS.USERS);
export const fetchGroupNodes = () => fetchApi(API_CONFIG.ENDPOINTS.GROUP_NODES);
export const fetchApplications = () => fetchApi(API_CONFIG.ENDPOINTS.APPLICATIONS);

export const fetchDashboardData = async () => {
  try {
    const [groups, nodes, metrics, interfaces, users, groupsNodes, applications] = await Promise.all([
      fetchGroups(),
      fetchNodes(),
      fetchMetrics(),
      fetchInterfaces(),
      fetchUsers(),
      fetchGroupNodes(),
      fetchApplications()
    ]);

    return {
      groups,
      nodes,
      metrics,
      interfaces,
      users,
      groups_nodes: groupsNodes,
      applications
    };
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    throw error;
  }
};