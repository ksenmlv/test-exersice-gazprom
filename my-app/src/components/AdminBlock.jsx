import React from 'react';
import '../styles/AdminBlock.scss';

const AdminBlock = ({ admin }) => {
  return (
    <div className="admin-block">
      <h3>Администратор</h3>
      {admin ? (
        <div className="admin-info">
          <p><strong>Имя:</strong> {admin.firstname} {admin.lastname}</p>
          <p><strong>Email:</strong> {admin.email}</p>
        </div>
      ) : (
        <p>Нет данных</p>
      )}
    </div>
  );
};

export default AdminBlock;