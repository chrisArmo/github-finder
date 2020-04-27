import React, { useContext } from 'react';

import AlertContext from '../../../context/alert/AlertContext';

// TODO: squash alert bug
const Alert = () => {
  const { cls, msg, show } = useContext(AlertContext);

  return (
    show && (
      <div
        className={`alert alert-${cls} text-center`}
        style={{
          width: '100%',
        }}
      >
        <i className="fas fa-info-circle" /> {msg}
      </div>
    )
  );
};

export default Alert;
