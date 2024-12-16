import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ label, ...props }) => {
  return <div className="form-row">
    <label htmlFor="name">{label}:</label>
    <input type="text" placeholder={`New ${label || ''}`} {...props} />
  </div>
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Input;
