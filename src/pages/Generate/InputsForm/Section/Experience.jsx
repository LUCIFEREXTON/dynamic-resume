import Input from '@app/shared/components/Input';
import { extend, filter, get, map, set, size } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const Experience = ({ section, parentName, onSectionChange }) => {
  const handleExperienceChange = (index, key, value) => {
    onSectionChange(set(extend([], section), [index, key], value));
  };

  const handleRemoveExperience = (index) => {
    onSectionChange(filter(section, (_, i) => i !== index));
  };

  const handleDurationChange = (expIdx, key, value) => {
    handleExperienceChange(expIdx, 'duration', set(extend({}, section?.duration), [key], value));
  };

  const handleContributionChange = (expIdx, index, key, value) => {
    const contributions = extend([], get(section, [expIdx, 'contributions']));
    set(contributions, [index || 0, key], value);
    handleExperienceChange(expIdx, 'contributions', contributions);
  };

  const handleRemoveContribution = (expIdx, index) => {
    handleExperienceChange(expIdx, 'contributions', section[expIdx].contributions.filter((_, i) => i !== index));
  };

  const handleContributionHighlightChange = (expIdx, cIndex, hIndex, value) => {
    const contributions = extend([], get(section, [expIdx, 'contributions']));
    const highlights = extend([], get(contributions, [cIndex, 'highlights']));
    set(highlights, hIndex || 0, value);
    handleContributionChange(expIdx, cIndex, 'highlights', highlights);
  };

  const handleRemoveContributionHighlight = (expIdx, cIndex, hIndex) => {
    handleContributionChange(expIdx, cIndex, 'highlights', section[expIdx].contributions[cIndex].highlights.filter((_, i) => i !== hIndex));
  };

  // eslint-disable-next-line react/display-name
  const renderContribution = (expIdx) => (contribution, i) => {
    return (
      <div className="contribution-block" key={i}>
        {i < size(get(section[expIdx, 'contributions'])) && (
          <button className='contribution-remove-btn' onClick={() => handleRemoveContribution(expIdx, i)}>
            Remove
          </button>
        )}
        <Input
          className="experience-input"
          type="text"
          label="Title"
          value={contribution.title || ''}
          name={`${parentName}[${expIdx}].contributions[${i}].title`}
          onChange={(e) => handleContributionChange(expIdx, i, 'title', e.target.value)}
        />
        <h4 className="highlights-title">Highlights</h4>
        <div className='highlights-container'>
          {contribution.highlights?.map((highlight, j) => (
            <div key={j} className="highlight-item">
              <Input
                className="experience-input"
                type="text"
                value={highlight || ''}
                name={`${parentName}[${expIdx}].contributions[${i}].highlights[${j}]`}
                onChange={(e) => handleContributionHighlightChange(expIdx, i, j, e.target.value)}
              />
              <button
                className='highlight-remove-btn'
                onClick={() => handleRemoveContributionHighlight(expIdx, i, j)}
              >
                ×
              </button>
            </div>
          ))}
          <div className="highlight-item">
            <Input
              className="experience-input"
              type="text"
              value={''}
              name={`${parentName}[${expIdx}].contributions[${i}].highlights[${contribution.highlights?.length}]`}
              onChange={(e) => handleContributionHighlightChange(expIdx, i, contribution.highlights?.length, e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderExperience = (experience, i) => (
    <div className='experience-entry' key={i}>
      {i < size(section) && (
        <div className="experience-header">
          <button className='experience-remove-btn' onClick={() => handleRemoveExperience(i)}>
            Remove
          </button>
        </div>
      )}
      <div className="experience-form-grid">
        <Input
          className="experience-input"
          type="text"
          label="Position"
          value={experience.position || ''}
          name={`${parentName}[${i}].position`}
          onChange={(e) => handleExperienceChange(i, 'position', e.target.value)}
        />
        <Input
          className="experience-input"
          type="text"
          label="Company"
          value={experience.company || ''}
          name={`${parentName}[${i}].company`}
          onChange={(e) => onSectionChange(i, 'company', e.target.value)}
        />
        <Input
          className="experience-input"
          type="text"
          label="Location"
          value={experience.location || ''}
          name={`${parentName}[${i}].location`}
          onChange={(e) => onSectionChange(i, 'location', e.target.value)}
        />
        <Input
          className="experience-input"
          type="text"
          label="Duration Start"
          value={experience.duration?.start || ''}
          name={`${parentName}[${i}].duration.start`}
          onChange={(e) => handleDurationChange(i, 'start', e.target.value)}
        />
        <Input
          className="experience-input"
          type="text"
          label="Duration End"
          value={experience.durationEnd || ''}
          name={`${parentName}[${i}].duration.end`}
          onChange={(e) => handleDurationChange(i, 'end', e.target.value)}
        />
      </div>
      <div className='contributions-section'>
        <h4 className="contributions-title">Contributions</h4>
        <div className="contributions-container">
          {experience.contributions?.map(renderContribution(i))}
          {renderContribution(i)({ title: '', highlights: [] }, size(experience.contributions))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="experience-container">
      {map(section, renderExperience)}
      {renderExperience({ position: '', company: '', location: '', duration: { start: '', end: '' }, contributions: [] }, size(section))}
    </div>
  );
}

Experience.propTypes = {
  section: PropTypes.object.isRequired,
  parentName: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired
};

export default Experience;
