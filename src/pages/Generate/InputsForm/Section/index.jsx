import PropTypes from "prop-types";
import React from "react";
import Achievements from "./Achievements";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";

const Section = ({ parentName, type, section, onSectionChange }) => {

  const handleSectionChange = (section) => {
    onSectionChange(section, type);
  };

  const renderSectionType = () => {
    return (
      <div className="form-field">
        <label className="form-label">
          Section Type
        </label>
        <div className="input-container">
        <select
          className="section-select"
          value={type}
          onChange={(e) => onSectionChange(e.target.value === 'summary' ? '' : [], e.target.value)}
        >
          <option value="">Select Type for New Section</option>
          <option value="experience">Experience</option>
          <option value="skills">Skills</option>
          <option value="achievements">Achievements</option>
          <option value="education">Education</option>
          <option value="summary">Summary</option>
        </select>
      </div>
    </div>
    );
  }

  const renderSection = () => {
    switch (type) {
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
        return (
          <div className="section-summary">
            <textarea
              className="summary-textarea"
              placeholder="Write your professional summary here..."
              value={section || ''}
              name={`${parentName}.content`}
              onChange={(e) => onSectionChange(e.target.value, type)}
            />
          </div>
        );
      }
      default: {
        return null
      }
    }
  }

  return (
    <div className="resume-section">
      {renderSectionType()}
      <div className="section-content">
        {renderSection()}
      </div>
    </div>
  );
}

Section.propTypes = {
  parentName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  onSectionChange: PropTypes.func.isRequired
};

export default Section;
