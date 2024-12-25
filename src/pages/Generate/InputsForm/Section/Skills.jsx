import Input from '@app/shared/components/Input';
import { extend, filter, map, set, size } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import iconNames from '../icon-name.json';

const Skills = ({ parentName, section, onSectionChange }) => {
  const handleSkillChange = (index, key, value) => {
    onSectionChange(set(extend({}, section), [index, key], value));
  };

  const removeSkill = (index) => {
    onSectionChange(filter(section, (_, i) => i !== index));
  }

  const renderSkill = (skill, i) => {
    return (
      <div className='skill-entry' key={i}>
        <div className="skill-header">
          {i < size(section) && (
            <button className='skill-remove-btn' onClick={() => removeSkill(i)}>
              <span className="btn-icon">−</span>
              <span className="btn-text">Remove</span>
            </button>
          )}
        </div>
        <div className="skill-form-grid">
          <div className="skill-input-group">
            <Input
              className="skill-input"
              key={`label-${i}`}
              type="text"
              label="Label"
              value={skill.label || ''}
              name={`${parentName}[${i}].label`}
              onChange={(e) => handleSkillChange(i, 'label', e.target.value)}
            />
          </div>
          <div className="skill-input-group">
            <Input
              className="skill-input"
              key={`icon-${i}`}
              type="text"
              label="Icon bi-*"
              value={skill.icon || ''}
              name={`${parentName}[${i}].icon`}
              onChange={(e) => handleSkillChange(i, 'icon', e.target.value)}
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
          <div className="skill-input-group skill-input-full">
            <Input
              className="skill-input"
              key={`skills-${i}`}
              type="text"
              label="Skills separated by comma"
              value={skill.skills || ''}
              name={`${parentName}[${i}].skills`}
              onChange={(e) => handleSkillChange(i, 'skills', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skills-container">
      {map(section, renderSkill)}
      {renderSkill({ label: '', icon: '', skills: '' }, size(section))}
    </div>
  );
}

Skills.propTypes = {
  parentName: PropTypes.string,
  section: PropTypes.object,
  onSectionChange: PropTypes.func,
};

export default Skills;
