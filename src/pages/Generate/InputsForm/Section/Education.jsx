import Input from '@app/components/Input';
import { extend, map, set, size } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const Education = ({ parentName, section, onSectionChange }) => {
  const handleEducationChange = (index, key, value) => {
    onSectionChange(set(extend([], section), [index, key], value));
  };

  const handleDurationChange = (index, key, value) => {
    handleEducationChange(index, 'duration', set(extend({}, section[index]?.duration), [key], value));
  };

  const removeEducation = (index) => {
    onSectionChange('skills', section.filter((_, i) => i !== index));
  }

  const renderEducation = (education, i) => {
    return (
      <div className='education-entry' key={i}>
        <div className="education-header">
          {i < size(section) && (
            <button className='education-remove-btn' onClick={() => removeEducation(i)}>
              <span className="btn-text">Remove</span>
            </button>
          )}
        </div>
        <div className="education-form-grid">
          <Input
            className="education-input"
            key={`degree-${i}`}
            type="text"
            label="Degree"
            value={education.degree || ''}
            name={`${parentName}[${i}].degree`}
            onChange={(e) => handleEducationChange(i, 'degree', e.target.value)}
          />
          <Input
            className="education-input"
            key={`institution-${i}`}
            type="text"
            label="Institute"
            value={education.institution || ''}
            name={`${parentName}[${i}].institution`}
            onChange={(e) => handleEducationChange(i, 'institution', e.target.value)}
          />
          <Input
            className="education-input"
            key={`duration-start-${i}`}
            type="text"
            label="Start Date"
            value={education.duration?.start || ''}
            name={`${parentName}[${i}].duration.start`}
            onChange={(e) => handleDurationChange(i, 'start', e.target.value)}
          />
          <Input
            className="education-input"
            key={`duration-end-${i}`}
            type="text"
            label="End Date"
            value={education.duration?.end || ''}
            name={`${parentName}[${i}].duration.end`}
            onChange={(e) => handleDurationChange(i, 'end', e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="education-container">
      {map(section, renderEducation)}
      {renderEducation({ degree: '', institution: '', duration: { start: '', end: '' } }, size(section))}
    </div>
  );
}

Education.propTypes = {
  parentName: PropTypes.string,
  section: PropTypes.object,
  onSectionChange: PropTypes.func,
};

export default Education;
