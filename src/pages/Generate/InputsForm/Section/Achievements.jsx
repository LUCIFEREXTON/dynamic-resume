import Input from '@app/components/Input';
import { extend, set } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const Achievements = ({ parentName, section, onSectionChange }) => {
  const handleRemoveAchievement = (index) => {
    onSectionChange(section?.filter((_, i) => i !== index));
  };

  const renderItem = (item, i) => {
    return (
      <div className='achievement-item' key={i}>
        {i < section.length && (
          <button
            className='achievement-remove-btn'
            onClick={() => handleRemoveAchievement(i)}
          >
            <span className="btn-text">Remove</span>
          </button>
        )}
        <div className="achievement-input-wrapper">
          <Input
            className="achievement-input"
            key={i}
            type="text"
            value={item || ''}
            name={`${parentName}[${i}]`}
            onChange={(e) => onSectionChange(set(extend([], section), [i], e.target.value))}
            placeholder="Add new achievement"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="achievements-section">
      <h4 className="achievements-title">Achievement</h4>
      <div className="achievements-list">
        {section?.map(renderItem)}
        {renderItem('', section?.length)}
      </div>
    </div>
  );
}

Achievements.propTypes = {
  parentName: PropTypes.string,
  section: PropTypes.object,
  onSectionChange: PropTypes.func,
};

export default Achievements;
