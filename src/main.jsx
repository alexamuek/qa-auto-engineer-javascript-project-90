import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@hexlet/testing-task-manager';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Исправлено: передаем как компонент, а не функцию */}
  </React.StrictMode>
);
