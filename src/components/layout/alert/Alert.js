import React from 'react';

const Alert = ({ alert, removeAlert }) => {
  return (
    alert !== null && (
      <div
        className={`alert alert-${alert.type} text-center`}
        style={{
          width: '100%',
        }}
      >
        <i className="fas fa-info-circle" /> {alert.msg}
        <button
          style={{
            cursor: 'pointer',
            marginLeft: '50px',
            padding: '1px 1rem',
          }}
          type="button"
          onClick={removeAlert}
        >
          x
        </button>
      </div>
    )
  );
};

export default Alert;
