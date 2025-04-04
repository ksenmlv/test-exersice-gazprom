SELECT 
    g.id AS group_id,
    g.caption AS group_caption,
    
    -- Информация о нодах
    n.id AS node_id,
    n.caption AS node_caption,
    
    --Информация о статусе ноды (цвет и описание)
    ns.color AS status_color,
    ns.description AS status_description,
    
    -- Информация об интерфейсе ноды
    i.id AS interface_id,
    i.caption AS interface_caption,
    i.status AS interface_status,
    
    -- Информация о приложениях
    a.id AS application_id,
    a.caption AS application_caption,
    
    -- Информация об администраторах
    u.id AS admin_id,
    u.firstname AS admin_firstname,
    u.lastname AS admin_lastname,
    u.email AS admin_email
    
FROM 
    groups g
    
-- Вывод всех данных 	
LEFT JOIN groups_nodes gn ON g.id = gn.group_id
LEFT JOIN nodes n ON gn.node_id = n.id  
LEFT JOIN statuses ns ON n.status = ns.id
LEFT JOIN interfaces i ON n.interface = i.id
LEFT JOIN nodes_applications na ON n.id = na.node_id
LEFT JOIN applications a ON na.application_id = a.id
LEFT JOIN users u ON n.admin = u.id
    
-- Группировка по id групп и нодов	
ORDER BY group_id, n.id;