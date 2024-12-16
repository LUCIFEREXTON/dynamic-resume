import PropTypes from "prop-types";
import React from "react";
import Achievements from "./Achievements";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";

const Section = ({ parentName, section, onSectionChange }) => {

  const handleSectionChange = (key, value) => {
    onSectionChange({ ...section, [key]: value });
  };

  const renderSectionType = () => {
    return <select
      className="select-input"
      value={section?.type}
      onChange={(e) => onSectionChange({ type: e.target.value })}
    >
      <option value="">Select Type for New Section</option>
      <option value="experience">Experience</option>
      <option value="skills">Skills</option>
      <option value="achievements">Achievements</option>
      <option value="education">Education</option>
      <option value="summary">Summary</option>
    </select>
  }

  const renderSection = () => {
    switch (section?.type) {
      case 'experience': {
        return <Experience
          parentName={parentName}
          section={section}
          onSectionChange={handleSectionChange}
        />
      }
      case 'skills': {
        return <Skills
          parentName={parentName}
          section={section}
          onSectionChange={handleSectionChange}
        />
      }
      case 'achievements': {
        return <Achievements
          parentName={parentName}
          section={section}
          onSectionChange={handleSectionChange}
        />
      }
      case 'education': {
        return <Education
          parentName={parentName}
          section={section}
          onSectionChange={handleSectionChange}
        />
      }
      case 'summary': {
        return <div>
          <textarea
            className="text-input"
            type="text"
            placeholder="Summary"
            value={section?.content || ''}
            name={`${parentName}.content`}
            onChange={(e) => handleSectionChange('content', e.target.value)}
          />
        </div>
      }
      default: {
        return null
      }
    }
  }

  return <div className="item">
    {renderSectionType()}
    {renderSection()}
  </div>;
}

Section.propTypes = {
  parentName: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  onSectionChange: PropTypes.func.isRequired
};

export default Section;
