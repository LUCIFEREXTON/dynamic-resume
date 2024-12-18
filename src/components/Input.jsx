// Input.jsx
import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ label, className, error, ...props }) => {
  return (
    <div className="form-field">
      {label && (
        <label className="form-label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <div className="input-container">
        <input
          className={`form-input ${className || ''} ${error ? 'input-error' : ''}`}
          placeholder={`Enter ${label || ''}`}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
