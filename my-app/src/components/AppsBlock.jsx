import React, { useState, useEffect } from 'react';
import { fetchApplications } from '../utils/api';
import '../styles/AppsBlock.scss';

const AppsBlock = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApps = async () => {
      try {
        setLoading(true);
        setError(null);

        const apps = await fetchApplications();
        setApplications(apps);
      } catch (err) {
        console.error('Apps load error:', err);
        setError(`Ошибка загрузки приложений: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  if (loading) {
    return (
      <div className="apps-block">
        <h3>Приложения</h3>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apps-block error">
        <h3>Приложения</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="apps-block">
      <h3>Приложения ({applications.length})</h3>

      {applications.length > 0 ? (
        <ul className="applications-list">
          {applications.map(app => (
            <li key={app.id} className="app-item">
              <span className="app-name">{app.caption || 'Без названия'}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Приложений не найдено</p>
      )}
    </div>
  );
};

export default AppsBlock;