import Input from '@app/shared/components/Input';
import { extend, map, set, size } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import iconNames from './icon-name.json';

const Header = ({ parentName, header, onHeaderChange }) => {

  const handleContactChange = (index, key, value) => {
    const contacts = extend([], header?.contact);
    set(contacts, [index, key], value);
    onHeaderChange('contact', contacts);
  };

  const handleRemoveContact = (index) => {
    onHeaderChange('contact', header?.contact.filter((_, i) => i !== index));
  };

  const renderContact = (contact, index) => {
    return (
      <div key={index} className='header-contact-entry'>
        {index < size(header?.contact) && (
          <button className='contact-remove-btn' onClick={() => handleRemoveContact(index)}>
            <span className="btn-icon">−</span>
            <span className="btn-text">Remove</span>
          </button>
        )}
        <div className="contact-form-grid">
          <div className="contact-input-group">
            <label className="form-label">
              Section Type
            </label>
            <select
              className='contact-select'
              value={contact.type}
              name={`${parentName}.contact[${index}].type`}
              onChange={(e) => handleContactChange(index, 'type', e.target.value)}
            >
              <option value="">Select Type for New Contact</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="url">URL</option>
            </select>
          </div>
          <div className="contact-input-group">
            <Input
              label="Value"
              className='contact-input'
              type="text"
              value={contact.value}
              name={`${parentName}.contact[${index}].value`}
              onChange={(e) => handleContactChange(index, 'value', e.target.value)}
            />
          </div>
          <div className="contact-input-group">
            <Input
              label="Icon"
              className='contact-input'
              type="text"
              value={contact.icon}
              name={`${parentName}.contact[${index}].icon`}
              onChange={(e) => handleContactChange(index, 'icon', e.target.value)}
              list="icon-list"
            />
            <datalist id="icon-list">
              {map(iconNames, (icon, i) => (
                <option key={i} value={icon}>
                  <span className={`bi ${icon}`} />{icon}
                </option>
              ))}
            </datalist>
          </div>
          {contact.type === 'url' && (
            <div className="contact-input-group">
              <Input
                label="Link"
                className='contact-input'
                type="text"
                value={contact.link}
                name={`${parentName}.contact[${index}].link`}
                onChange={(e) => handleContactChange(index, 'link', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="header-section">
      <h3 className="header-title">Header Information</h3>
      <div className='header-main-info'>
        <Input
          label="Name"
          type="text"
          value={header?.name}
          name={`${parentName}.name`}
          className='header-input'
          onChange={(e) => onHeaderChange('name', e.target.value)}
        />
        <Input
          label="Position"
          type="text"
          value={header?.position}
          name={`${parentName}.position`}
          className='header-input'
          onChange={(e) => onHeaderChange('position', e.target.value)}
        />
      </div>
      <div className='header-contacts'>
        <h4 className="contacts-title">Contact Information</h4>
        <div className="contacts-list">
          {map(header?.contact, renderContact)}
          {renderContact({ type: '', value: '', icon: '' }, size(header?.contact))}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  parentName: PropTypes.string.isRequired,
  header: PropTypes.object.isRequired,
  onHeaderChange: PropTypes.func.isRequired
};

export default Header;
