import { get, map, set } from 'lodash';
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

  const handleColumnChange = useCallback((column, index, section) => {
    onJsonChange((prevState) => {
      const sections = [...get(prevState, ['sections', column], [])];
      return {...set(prevState, ['sections', column], set(sections, (index || 0), section))};
    });
  }, [onJsonChange]);

  const handleRemoveSection = useCallback((column, index) => {
    onJsonChange((prevState) => ({...set(prevState, ['sections', column], get(prevState, ['sections', column], []).filter((_, i) => i !== index))}));
  }, [onJsonChange]);

  return (
    <div>
      <MetaData
        parent='metadata'
        metadata={jsonState.metadata}
        handleMetadataChange={handleMetadataChange}
      />
      <Header
        parent='header'
        header={jsonState.header}
        onHeaderChange={handleHeaderChange}
      />
      <div className="section" id="left-column">
        <h3 className="item-title">Left Column</h3>
        <div className='content-group'>
          {map(jsonState.sections?.leftColumn, (section, index) => <div key={`leftColumn-${index}`}>
            <button className='remove-btn' onClick={() => handleRemoveSection('leftColumn', index)}>Remove</button>
            <Section
              section={section}
              onSectionChange={section => handleColumnChange('leftColumn', index, section)}
              parentName={`sections.leftColumn[${index}]`}
            />
          </div>)}
          <Section
            key={`leftColumn-${jsonState.sections?.leftColumn?.length}`}
            section={{ type: '' }}
            onSectionChange={section => handleColumnChange('leftColumn', jsonState.sections?.leftColumn?.length, section)}
            parentName={`sections.leftColumn[${jsonState.sections?.leftColumn?.length}]`}
          />
        </div>
      </div>
      <div className="section" id="right-column">
        <h3 className="item-title">Right Column</h3>
        <div className='content-group'>
          {map(jsonState.sections?.rightColumn, (section, index) => <div key={`rightColumn-${index}`}>
            <button className='remove-btn' onClick={() => handleRemoveSection('rightColumn', index)}>Remove</button>
            <Section
              section={section}
              onSectionChange={section => handleColumnChange('rightColumn', index, section)}
              parentName={`sections.rightColumn[${index}]`}
            />
          </div>)}
          <Section
            key={`rightColumn-${jsonState.sections?.rightColumn?.length}`}
            section={{ type: '' }}
            onSectionChange={section => handleColumnChange('rightColumn', jsonState.sections?.rightColumn?.length, section)}
            parentName={`sections.rightColumn[${jsonState.sections?.rightColumn?.length}]`}
          />
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
