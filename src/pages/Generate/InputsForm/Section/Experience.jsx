import Input from '@app/components/Input';
import { extend, filter, get, map, set, size } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const Experience = ({ section, parentName, onSectionChange }) => {
  const handleExperienceChange = (index, key, value) => {
    onSectionChange('items', set(extend({}, section?.items), [index, key], value));
  };

  const handleRemoveExperience = (index) => {
    onSectionChange('items', filter(section?.items, (_, i) => i !== index));
  };

  const handleDurationChange = (expIdx, key, value) => {
    handleExperienceChange(expIdx, 'duration', set(extend({}, section?.duration), [key], value));
  };

  const handleContributionChange = (expIdx, index, key, value) => {
    const contributions = extend([], get(section, ['items', expIdx, 'contributions']));
    set(contributions, [index || 0, key], value);
    handleExperienceChange(expIdx, 'contributions', contributions);
  };

  const handleRemoveContribution = (expIdx, index) => {
    handleExperienceChange(expIdx, 'contributions', section?.items[expIdx].contributions.filter((_, i) => i !== index));
  };

  const handleContributionHighlightChange = (expIdx, cIndex, hIndex, value) => {
    const contributions = extend([], get(section, ['items', expIdx, 'contributions']));
    const highlights = extend([], get(contributions, [cIndex, 'highlights']));
    set(highlights, hIndex || 0, value);
    handleContributionChange(expIdx, cIndex, 'highlights', highlights);
  };

  const handleRemoveContributionHighlight = (expIdx, cIndex, hIndex) => {
    handleContributionChange(expIdx, cIndex, 'highlights', section?.items[expIdx].contributions[cIndex].highlights.filter((_, i) => i !== hIndex));
  };

  // eslint-disable-next-line react/display-name
  const renderContribution = (expIdx) => (contribution, i) => {
    return <div className='input-group' key={i}>
      {i < size(get(section['items', expIdx, 'contributions'])) && <button className='remove-btn' onClick={() => handleRemoveContribution(expIdx, i)}>Remove</button>}
      <Input
        className="text-input"
        type="text"
        label="Title"
        value={contribution.title || ''}
        name={`${parentName}.items[${expIdx}].contributions[${i}].title`}
        onChange={(e) => handleContributionChange(expIdx, i, 'title', e.target.value)}
      />
      <div className='input-group'>
        {contribution.highlights.map((highlight, j) => (
          <div key={j}>
            <Input
              className="text-input"
              type="text"
              label="Highlight"
              value={highlight || ''}
              name={`${parentName}.items[${expIdx}].contributions[${i}].highlights[${j}]`}
              onChange={(e) => handleContributionHighlightChange(expIdx, i, j, e.target.value)}
              />
            <button className='remove-btn' onClick={() => handleRemoveContributionHighlight(expIdx, i, j)}>Remove</button>
          </div>
        ))}
        <Input
          className="text-input"
          key={contribution.highlights.length}
          type="text"
          label="Highlight"
          value={''}
          name={`${parentName}.items[${expIdx}].contributions[${i}].highlights[${contribution.highlights.length}]`}
          onChange={(e) => handleContributionHighlightChange(expIdx, i, contribution.highlights.length, e.target.value)}
        />
      </div>
    </div>
  };

  const renderExperience = (experience, i) => (
    <div className='input-group' key={i} style={{ borderTop: '1px solid #ccc', padding: '10px 0' }}>
      {i < size(section?.items) && <button className='remove-btn' onClick={() => handleRemoveExperience(i)}>Remove</button>}
      <br/>
      <Input
        className="text-input"
        type="text"
        label="Position"
        value={experience.position || ''}
        name={`${parentName}.items[${i}].position`}
        onChange={(e) => onSectionChange(i, 'position', e.target.value)}
      />
      <Input
        className="text-input"
        type="text"
        label="Company"
        value={experience.company || ''}
        name={`${parentName}.items[${i}].company`}
        onChange={(e) => onSectionChange(i, 'company', e.target.value)}
      />
      <Input
        className="text-input"
        type="text"
        label="Location"
        value={experience.location || ''}
        name={`${parentName}.items[${i}].location`}
        onChange={(e) => onSectionChange(i, 'location', e.target.value)}
      />
      <Input
        className="text-input"
        type="text"
        label="Duration Start"
        value={experience.duration?.start || ''}
        name={`${parentName}.items[${i}].duration.start`}
        onChange={(e) => handleDurationChange(i, 'start', e.target.value)}
      />
      <Input
        className="text-input"
        type="text"
        label="Duration End"
        value={experience.durationEnd || ''}
        name={`${parentName}.items[${i}].duration.end`}
        onChange={(e) => handleDurationChange(i, 'end', e.target.value)}
      />
      {experience.contributions.map(renderContribution(i))}
      {renderContribution(i)({ title: '', highlights: [] }, size(experience.contributions))}
    </div>);

  return <div>
    {map(section?.items, renderExperience)}
    {renderExperience({ position: '', company: '', location: '', duration: { start: '', end: '' }, contributions: [] }, size(section?.items))}
  </div>
}

Experience.propTypes = {
  section: PropTypes.object.isRequired,
  parentName: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired
};

export default Experience;
