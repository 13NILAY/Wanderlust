import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const AlertError = ({ message }) => {
  return (
    <div className='row mt-3'>
      <div className='alert alert-danger col-6 offset-3' role='alert'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon 
            icon={faTriangleExclamation} 
            size="xl"
            style={{ color: "#d71936", marginRight: '10px' }} 
          />
          <p className='alert-heading' style={{ margin: 0 }}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertError;
