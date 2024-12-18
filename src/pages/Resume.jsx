import axios from "axios";
import { map } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { RenderAchievements, RenderContacts, RenderEducation, RenderExperience, RenderSkills, RenderSummary } from "@app/helpers/resumePageHelper";

export default function Resume({ resumeData }) {
  const [resume, setResume] = useState(null);

  const renderSections = (sections) => map(sections?.order, (type) => {
    switch (type) {
      case 'experience':
        return <RenderExperience key={type} experienceSection={sections.data[type]} />;
      case 'summary':
        return <RenderSummary key={type} summarySection={sections.data[type]} />;
      case 'achievements':
        return <RenderAchievements key={type} achievementsSection={sections.data[type]} />;
      case 'skills':
        return <RenderSkills key={type} skillsSection={sections.data[type]} />;
      case 'education':
        return <RenderEducation key={type} educationSection={sections.data[type]} />;
      default:
        return null;
    }
  });

  const initiateCssVariables = (metaData) => {
    const root = document.documentElement;
    if (metaData?.primaryColor) {
      root.style.setProperty('--primary-color', metaData.primaryColor);
    }
    if (metaData?.textPrimaryColor) {
      root.style.setProperty('--text-primary-color', metaData.textPrimaryColor);
    }
    if (metaData?.textSecondaryColor) {
      root.style.setProperty('--text-secondary-color', metaData.textSecondaryColor);
    }
    if (metaData?.resumeBackground) {
      root.style.setProperty('--resume-background', metaData.resumeBackground);
    }
    if (metaData?.borderColor) {
      root.style.setProperty('--border-color', metaData.borderColor);
    }
  }

  useEffect(() => {
    if (resumeData) {
      setResume(resumeData);
    } else {
      axios.get('resume.json')
        .then(response => {
          setResume(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [resumeData]);

  useEffect(() => {
    if (resume) {
      document.title = `${resume.header?.name} Resume`;
      initiateCssVariables(resume.metadata);
    }

    return () => {
      document.title = 'Resume';
    }
  }, [resume]);

  if (!resume) {
    return <div>Loading...</div>;
  }

  return <div id="resume-container">
    <main>
      <header>
        <div>
          <h1 id="name">{resume.header?.name}</h1>
          <h3 id="position" className="primary-color">{resume.header?.position}</h3>
        </div>
        <div id="contact">
          <RenderContacts contact={resume.header?.contact || []} />
        </div>
      </header>
      <div id="container">
        <div id="left-section">
          {renderSections(resume.sections?.leftColumn)}
        </div>
        <div id="right-section">
          {renderSections(resume.sections?.rightColumn)}
        </div>
      </div>
    </main>
  </div>;
}

Resume.propTypes = {
  resumeData: PropTypes.object,
};
