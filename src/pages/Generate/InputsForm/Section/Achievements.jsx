import Input from '@app/components/Input';
import { extend, set } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const Achievements = ({ parentName, section, onSectionChange }) => {
  const handleRemoveAchievement = (index) => {
    onSectionChange('items', section?.items?.filter((_, i) => i !== index));
  };

  const renderItem = (item, i) => {
    return <div className='input-group' key={i}>
      {i < section?.items.length && <button className='remove-btn' onClick={() => handleRemoveAchievement(i)}>Remove</button>}
      <Input
        className="text-input"
        key={i}
        type="text"
        label="Achievement"
        value={item || ''}
        name={`${parentName}.items[${i}]`}
        onChange={(e) => onSectionChange('items', set(extend({}, section?.items), [i], e.target.value))}
      />
    </div>
  }

  return <div>
    {section?.items?.map(renderItem)}
    {renderItem('', section?.items?.length)}
  </div>
}

Achievements.propTypes = {
  parentName: PropTypes.string,
  section: PropTypes.object,
  onSectionChange: PropTypes.func,
};

export default Achievements;
