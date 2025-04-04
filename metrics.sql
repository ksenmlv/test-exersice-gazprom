SELECT 
    m.id AS metric_id,
    m.datetime AS metric_time,
    m.cpu_utilization,
    m.memory_utilization,
    m.disk_utilization,
    
    -- Информация о ноде
    n.id AS node_id,
    n.caption AS node_name,
    
    -- Информация о статусе ноды
    s.color AS node_status_color,
    s.description AS node_status_description,
    
    -- Информация об интерфейсе ноды
    i.id AS interface_id,
    i.caption AS interface_name
    
FROM 
    metrics m
    
-- Привязка метрик к нодам
LEFT JOIN nodes n ON m.node_id = n.id
LEFT JOIN statuses s ON n.status = s.id
LEFT JOIN interfaces i ON n.interface = i.id

-- Сортировка по времени метрик
ORDER BY m.datetime DESC;