// src/components/Notifications/Notification.jsx
import React from 'react';

const Notification = ({ type, message }) => {
  const styles = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor:
      type === 'success'
        ? '#4CAF50'
        : type === 'error'
        ? '#f44336'
        : type === 'info'
        ? '#2196F3'
        : '#555',
  };

  return <div style={styles}>{message}</div>;
};

export default Notification;
