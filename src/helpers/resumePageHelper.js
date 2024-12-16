import React from 'react';
import DomPurify from "dompurify";
import PropTypes from "prop-types";
import { get, map } from 'lodash';

export const RenderContacts = ({ contact }) => {
  const renderContactHref = (contact) => {
    if (contact?.type === 'phone') {
      return `tel:${contact?.value}`;
    }
    if (contact?.type === 'email') {
      return `mailto:${contact?.value}`;
    }
    if (contact?.type === 'url') {
      return contact?.value;
    }
    return '#';
  };

  const renderIcon = (contact) => {
    return contact?.icon || (contact?.type === 'phone' ? 'bi-telephone-fill' : (contact?.type === 'email' ? 'bi-envelope-fill' : 'link-45deg'));
  };

  return contact?.map((contact) => (
  <a
    key={contact?.value}
    href={renderContactHref(contact)}
    className="item"
  >
    <span>{contact?.value}</span>
    <i className={`bi ${renderIcon(contact)} primary-color`} />
    </a>))
};

export const RenderExperience = ({ experienceSection }) => {
  const renderContributions = (contributions) => (contributions.map((contribution, index) => (
    <div className="contribution" key={index}>
      <div className="title">{contribution.title}</div>
      <div className="highlights">
        <ul>
          {contribution?.highlights?.map((highlight, index) => {
            return <li
              key={index}
              dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(highlight || '') }}
            />;
          })}
        </ul>
      </div>
    </div>
  )))

  return <section id="experience">
    <h3>EXPERIENCE</h3>
    {map(experienceSection?.items, (experience) => (<div className="body">
      <div className="position">{experience.position}</div>
      <div className="company primary-color">{experience.company}</div>
      {(
        experience.location ||
        get(experience.duration, 'start') ||
        get(experience.duration, 'end')
      ) ? <div className="extra">
        {experience.location ? <div className="item">
          <i className="bi bi-geo-alt primary-color"></i>
          <span>{experience.location}</span>
        </div> : null}
        {(get(experience.duration, 'start') || get(experience.duration, 'end')) ? <div className="item">
          <i className="bi bi-calendar3"></i>
          <span>{experience.duration?.start} - {experience.duration?.end || 'Present'}</span>
        </div> : null}
      </div> : null}
      {renderContributions(experience.contributions)}
    </div>))}
  </section>
}

export const RenderSummary = ({ summarySection }) => {
  return <section id="summary">
    <h3>SUMMARY</h3>
    <p className="body" dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(summarySection?.content || '') }} />
  </section>
}

export const RenderAchievements = ({ achievementsSection }) => {
  return <section id="achievements">
    <h3>KEY ACHIEVEMENTS</h3>
    <div className="body">
      {map(achievementsSection?.items, (achievement) => (
        <div className="item">
          <i className="bi bi-lightning-charge-fill primary-color"></i>
          <span dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(achievement || '') }} />
        </div>
      ))}
    </div>
  </section>
}

export const RenderSkills = ({ skillsSection }) => {
  return <section id="skills">
    <h3>SKILLS</h3>
    <div className="body">
      {map(skillsSection?.categories, (skill) => (
        <>
          <span className="primary-color">
            <i className={`bi bi-${skill.icon}`}></i>
            {skill.label}:
          </span>
          <span>{skill.skills}</span>
        </>
      ))}
    </div>
  </section>
}

export const RenderEducation = ({ educationSection }) => {
  return <section id="education">
    <h3>EDUCATION</h3>

    {map(educationSection?.items, (education) => (
      <div className="body">
        <div className="degree">{education.degree}</div>
        <div className="institute primary-color">{education.institute}</div>
        {get(education, 'duration.start') ? <div className="extra">
          <i className="bi bi-calendar3"></i>
          <span>{education.duration?.start} - {education.duration?.end || 'Present'}</span>
        </div> : null}
      </div>
    ))}
  </section>
}

RenderContacts.propTypes = {
  contact: PropTypes.array.isRequired
};

RenderExperience.propTypes = {
  experienceSection: PropTypes.object.isRequired
};

RenderSummary.propTypes = {
  summarySection: PropTypes.object.isRequired
};

RenderAchievements.propTypes = {
  achievementsSection: PropTypes.object.isRequired
};

RenderSkills.propTypes = {
  skillsSection: PropTypes.object.isRequired
};

RenderEducation.propTypes = {
  educationSection: PropTypes.object.isRequired
};
