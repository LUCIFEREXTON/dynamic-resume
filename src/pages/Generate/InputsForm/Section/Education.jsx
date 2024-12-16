import Input from '@app/components/Input';
import { extend, map, set, size } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const Education = ({ parentName, section, onSectionChange }) => {
  const handleEducationChange = (index, key, value) => {
    onSectionChange('skills', set(extend({}, section?.items), [index, key], value));
  };

  const handleDurationChange = (index, key, value) => {
    onSectionChange('skills', set(extend({}, section?.items), [index, 'duration', key], value));
  };

  const removeEducation = (index) => {
    onSectionChange('skills', section?.items.filter((_, i) => i !== index));
  }

  const renderEducation = (skill, i) => {
    return <div className='input-group' key={i}>
      {i < size(section?.items) && <button className='remove-btn' onClick={() => removeEducation(i)}>Remove</button>}
      <Input
        className="text-input"
        key={`degree-${i}`}
        type="text"
        label="Degree"
        value={skill.degree || ''}
        name={`${parentName}.items[${i}].degree`}
        onChange={(e) => handleEducationChange(i, 'degree', e.target.value)}
      />
      <Input
        className="text-input"
        key={`institution-${i}`}
        type="text"
        label="Institute"
        value={skill.institution || ''}
        name={`${parentName}.items[${i}].institution`}
        onChange={(e) => handleEducationChange(i, 'institution', e.target.value)}
      />
      <Input
        className="text-input"
        key={`duration-start-${i}`}
        type="text"
        label="Start Date"
        value={skill.duration?.start || ''}
        name={`${parentName}.items[${i}].duration.start`}
        onChange={(e) => handleDurationChange(i, 'start', e.target.value)}
      />
      <Input
        className="text-input"
        key={`duration-end-${i}`}
        type="text"
        label="End Date"
        value={skill.duration?.end || ''}
        name={`${parentName}.items[${i}].duration.end`}
        onChange={(e) => handleDurationChange(i, 'end', e.target.value)}
      />
    </div>
  }

  return <div>
    {map(section?.items, renderEducation)}
    {renderEducation({ degree: '', institution: '', duration: { start: '', end: '' } }, size(section?.items))}
  </div>
}

Education.propTypes = {
  parentName: PropTypes.string,
  section: PropTypes.object,
  onSectionChange: PropTypes.func,
};

export default Education;
