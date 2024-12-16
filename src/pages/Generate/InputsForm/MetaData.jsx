import Input from '@app/components/Input';
import PropTypes from 'prop-types';
import React from 'react';

const MetaData = ({ parentName, metadata, handleMetadataChange }) => {
  return <div className="section" id="metadata">
    <h3 className="item-title">Metadata</h3>
    <div className="input-group">
      <Input
        label="Primary Color"
        type="color"
        value={metadata?.primaryColor || "#0b57d0"}
        name={`${parentName}.primaryColor`}
        className="color-input"
        id="primary-color"
        onChange={(e) => handleMetadataChange('primaryColor', e.target.value)}
      />
      <Input
        label="Text Primary Color"
        type="color"
        value={metadata?.textPrimaryColor || "#333333"}
        name={`${parentName}.textPrimaryColor`}
        className="color-input"
        id="text-primary-color"
        onChange={(e) => handleMetadataChange('textPrimaryColor', e.target.value)}
      />
      <Input
        label="Text Secondary Color"
        type="color"
        value={metadata?.textSecondaryColor || "#000000"}
        name={`${parentName}.textSecondaryColor`}
        className="color-input"
        id="text-secondary-color"
        onChange={(e) => handleMetadataChange('textSecondaryColor', e.target.value)}
      />
      <Input
        label="Resume Background Color"
        type="color"
        value={metadata?.resumeBackgroundColor || "#f0f8ff"}
        name={`${parentName}.resumeBackgroundColor`}
        className="color-input"
        id="resume-background-color"
        onChange={(e) => handleMetadataChange('resumeBackgroundColor', e.target.value)}
      />
      <Input
        label="Border Color"
        type="color"
        value={metadata?.borderColor || "#ffffff"}
        name={`${parentName}.borderColor`}
        className="color-input"
        id="border-color"
        onChange={(e) => handleMetadataChange('borderColor', e.target.value)}
      />
    </div>
  </div>
}

MetaData.propTypes = {
  parentName: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  handleMetadataChange: PropTypes.func.isRequired
};

export default MetaData;
