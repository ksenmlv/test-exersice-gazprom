SELECT 
  g.id, 
  g.caption,
  json_group_array(
    json_object(
      'id', n.id,
      'caption', n.caption,
      'status', s.description,
      'status_color', s.color
    )
  ) as nodes
FROM groups g
LEFT JOIN groups_nodes gn ON g.id = gn.group_id
LEFT JOIN nodes n ON gn.node_id = n.id
LEFT JOIN statuses s ON n.status = s.id
GROUP BY g.id;