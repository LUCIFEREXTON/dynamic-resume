import Input from '@app/components/Input';
import { extend, map, set, size } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

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
    return <div key={index} className='contact-item'>
      {index < size(header?.contact) && <button className='remove-btn' onClick={() => handleRemoveContact(index)}>Remove</button>}
      <select
        className='select-input'
        value={contact.type}
        name={`${parentName}.contact[${index}].type`}
        onChange={(e) => handleContactChange(index, 'type', e.target.value)}
      >
        <option value="">Select Type for New Contact</option>
        <option value="phone">Phone</option>
        <option value="email">Email</option>
        <option value="url">URL</option>
      </select>
      <Input
        label="Value"
        className='text-input'
        type="text"
        value={contact.value}
        name={`${parentName}.contact[${index}].value`}
        onChange={(e) => handleContactChange(index, 'value', e.target.value)}
      />
      <Input
        label="Icon"
        className='text-input'
        type="text"
        value={contact.icon}
        name={`${parentName}.contact[${index}].icon`}
        onChange={(e) => handleContactChange(index, 'icon', e.target.value)}
      />
      {contact.type === 'url' && (
        <Input
          label="Link"
          className='text-input'
          type="text"
          value={contact.link}
          name={`${parentName}.contact[${index}].link`}
          onChange={(e) => handleContactChange(index, 'link', e.target.value)}
        />
      )}
    </div>
  };

  return <div className="section" id="header">
    <h3 className="item-title">Header</h3>
    <div className='input-group'>
      <Input
        label="Name"
        type="text"
        value={header?.name}
        name={`${parentName}.name`}
        className='text-input'
        onChange={(e) => onHeaderChange('name', e.target.value)}
      />
      <Input
        label="Position"
        type="text"
        value={header?.position}
        name={`${parentName}.position`}
        className='text-input'
        onChange={(e) => onHeaderChange('position', e.target.value)}
      />
    </div>
    <div className='contact-group'>
      <h4>Contact</h4>
      {map(header?.contact, renderContact)}
      {renderContact({ type: '', value: '', icon: '' }, size(header?.contact))}
    </div>
  </div>
}

Header.propTypes = {
  parentName: PropTypes.string.isRequired,
  header: PropTypes.object.isRequired,
  onHeaderChange: PropTypes.func.isRequired
};

export default Header;
