import React, { useState } from 'react';
import '../styles/GroupsBlock.scss';

const GroupsBlock = ({ groups, onSelectGroup }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    setSelectedGroup(group.id);
    onSelectGroup(group.id);
  };

  return (
    <div className="groups-block">
      <h3>Группы</h3>
      <ul>
        {groups.map(group => (
          <li 
            key={group.id}
            className={selectedGroup === group.id ? 'selected' : ''}
            onClick={() => handleGroupClick(group)}
          >
            {group.caption}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsBlock;