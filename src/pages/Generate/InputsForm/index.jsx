import { get, map, omit, set } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Header from './Header';
import MetaData from './MetaData';
import Section from './Section';

const InputsForm = ({ jsonState, onJsonChange }) => {
  const handleMetadataChange = useCallback((field, value) => {
    onJsonChange((prevState) => ({...set(prevState, ['metadata'], { ...prevState.metadata, [field]: value })}));
  }, [onJsonChange]);

  const handleHeaderChange = useCallback((field, value) => {
    onJsonChange((prevState) => ({...set(prevState, ['header'], { ...prevState.header, [field]: value })}));
  }, [onJsonChange]);

  const handleColumnChange = useCallback((column, oldType, newtype, section) => {
    let sections = { ...get(jsonState, ['sections', column, 'data'], {}) };
    if (oldType && oldType !== newtype) {
      sections = omit(sections, oldType);
    }
    sections[newtype] = section;
    const order = Object.keys(sections);
    onJsonChange((prevState) => ({
      ...set(prevState, ['sections', column], {
        data: sections,
        order
      })
    }));
  }, [onJsonChange]);

  const handleRemoveSection = useCallback((column, type) => {
    onJsonChange((prevState) => {
      let sections = { ...get(prevState, ['sections', column, 'data'], {}) };
      sections = omit(sections, type);
      const order = Object.keys(sections);
      return {
        ...set(prevState, ['sections', column], {
          data: sections,
          order
        })
      };
    })
  }, [onJsonChange]);

  return (
    <div className="resume-form-container">
      <div className="resume-form-section">
        <MetaData
          parent='metadata'
          metadata={jsonState.metadata}
          handleMetadataChange={handleMetadataChange}
        />
      </div>

      <div className="resume-form-section">
        <Header
          parent='header'
          header={jsonState.header}
          onHeaderChange={handleHeaderChange}
        />
      </div>

      <div className="resume-columns">
        <div className="resume-column" id="left-column">
          <h3 className="column-title">Left Column</h3>
          <div className='column-content'>
            {map(jsonState.sections?.leftColumn?.order, (type) => (
              <div className="section-wrapper" key={`leftColumn-${type}`}>
                <button
                  className='section-remove-btn'
                  onClick={() => handleRemoveSection('leftColumn', type)}
                >
                  <span className="btn-icon">−</span>
                  <span className="btn-text">Remove Section</span>
                </button>
                <Section
                  section={jsonState.sections.leftColumn.data[type]}
                  type={type}
                  onSectionChange={(section, newType) => handleColumnChange('leftColumn', type, newType, section)}
                  parentName={`sections.leftColumn.data.${type}`}
                />
              </div>
            ))}
            <div className="section-wrapper section-wrapper-new">
              <Section
                key={`leftColumn-new-item`}
                section={null}
                type=''
                onSectionChange={(section, newType) => handleColumnChange('leftColumn', '', newType, section)}
                parentName={`sections.leftColumn[${jsonState.sections?.leftColumn?.length}]`}
              />
            </div>
          </div>
        </div>

        <div className="resume-column" id="right-column">
          <h3 className="column-title">Right Column</h3>
          <div className='column-content'>
            {map(jsonState.sections?.rightColumn?.order, (type) => (
              <div className="section-wrapper" key={`rightColumn-${type}`}>
                <button
                  className='section-remove-btn'
                  onClick={() => handleRemoveSection('rightColumn', type)}
                >
                  <span className="btn-icon">−</span>
                  <span className="btn-text">Remove Section</span>
                </button>
                <Section
                  section={jsonState.sections.rightColumn.data[type]}
                  type={type}
                  onSectionChange={(section, newType) => handleColumnChange('rightColumn', type, newType, section)}
                  parentName={`sections.rightColumn.data.${type}`}
                />
              </div>
            ))}
            <div className="section-wrapper section-wrapper-new">
              <Section
                key={`rightColumn-new-item`}
                section={null}
                type=''
                onSectionChange={(section, newType) => handleColumnChange('rightColumn', '', newType, section)}
                parentName={`sections.rightColumn[${jsonState.sections?.rightColumn?.length}]`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InputsForm.propTypes = {
  jsonState: PropTypes.object.isRequired,
  onJsonChange: PropTypes.func.isRequired
};

export default InputsForm;
