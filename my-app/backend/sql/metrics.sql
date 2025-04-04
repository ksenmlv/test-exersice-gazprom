SELECT 
  m.id,
  m.datetime,
  m.cpu_utilization,
  m.memory_utilization,
  m.disk_utilization,
  m.node_id,
  n.caption as node_name
FROM metrics m
JOIN nodes n ON m.node_id = n.id
ORDER BY m.datetime DESC
LIMIT 100;