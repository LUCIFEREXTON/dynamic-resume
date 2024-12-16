import Input from '@app/components/Input';
import { extend, filter, map, set, size } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const Skills = ({ parentName, section, onSectionChange }) => {
  const handleSkillChange = (index, key, value) => {
    onSectionChange('skills', set(extend({}, section?.categories), [index, key], value));
  };

  const removeSkill = (index) => {
    onSectionChange('skills', filter(section?.categories, (_, i) => i !== index));
  }

  const renderSkill = (skill, i) => {
    return <div className='input-group' key={i}>
      {i < size(section?.categories) && <button className='remove-btn' onClick={() => removeSkill(i)}>Remove</button>}
      <Input
        className="text-input"
        key={`label-${i}`}
        type="text"
        label="Label"
        value={skill.label || ''}
        name={`${parentName}.categories[${i}].label`}
        onChange={(e) => handleSkillChange(i, 'label', e.target.value)}
      />
      <Input
        className="text-input"
        key={`icon-${i}`}
        type="text"
        label="Icon bi-*"
        value={skill.icon || ''}
        name={`${parentName}.categories[${i}].icon`}
        onChange={(e) => handleSkillChange(i, 'icon', e.target.value)}
      />
      <Input
        className="text-input"
        key={`skills-${i}`}
        type="text"
        label="Skills separated by comma"
        value={skill.skills || ''}
        name={`${parentName}.categories[${i}].skills`}
        onChange={(e) => handleSkillChange(i, 'skills', e.target.value)}
      />
    </div>
  }

  return <div>
    {map(section?.categories, renderSkill)}
    {renderSkill({ label: '', icon: '', skills: '' }, size(section?.categories))}
  </div>
}

Skills.propTypes = {
  parentName: PropTypes.string,
  section: PropTypes.object,
  onSectionChange: PropTypes.func,
};

export default Skills;
