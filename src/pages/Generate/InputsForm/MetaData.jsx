import Input from '@app/shared/components/Input';
import PropTypes from 'prop-types';
import React from 'react';

const MetaData = ({ parentName, metadata, handleMetadataChange }) => {
  return (
    <div className="metadata-section">
      <h3 className="metadata-title">Theme Customization</h3>
      <div className="color-picker-grid">
        <div className="color-picker-item">
          <Input
            label="Primary Color"
            type="color"
            value={metadata?.primaryColor || "#0b57d0"}
            name={`${parentName}.primaryColor`}
            className="color-picker-input"
            id="primary-color"
            onChange={(e) => handleMetadataChange('primaryColor', e.target.value)}
          />
          <span className="color-picker-label">Primary Color</span>
        </div>

        <div className="color-picker-item">
          <Input
            label="Text Primary Color"
            type="color"
            value={metadata?.textPrimaryColor || "#333333"}
            name={`${parentName}.textPrimaryColor`}
            className="color-picker-input"
            id="text-primary-color"
            onChange={(e) => handleMetadataChange('textPrimaryColor', e.target.value)}
          />
          <span className="color-picker-label">Text Primary</span>
        </div>

        <div className="color-picker-item">
          <Input
            label="Text Secondary Color"
            type="color"
            value={metadata?.textSecondaryColor || "#000000"}
            name={`${parentName}.textSecondaryColor`}
            className="color-picker-input"
            id="text-secondary-color"
            onChange={(e) => handleMetadataChange('textSecondaryColor', e.target.value)}
          />
          <span className="color-picker-label">Text Secondary</span>
        </div>

        <div className="color-picker-item">
          <Input
            label="Background Color"
            type="color"
            value={metadata?.resumeBackgroundColor || "#f0f8ff"}
            name={`${parentName}.resumeBackgroundColor`}
            className="color-picker-input"
            id="resume-background-color"
            onChange={(e) => handleMetadataChange('resumeBackgroundColor', e.target.value)}
          />
          <span className="color-picker-label">Background</span>
        </div>

        <div className="color-picker-item">
          <Input
            label="Border Color"
            type="color"
            value={metadata?.borderColor || "#ffffff"}
            name={`${parentName}.borderColor`}
            className="color-picker-input"
            id="border-color"
            onChange={(e) => handleMetadataChange('borderColor', e.target.value)}
          />
          <span className="color-picker-label">Border</span>
        </div>
      </div>
    </div>
  );
}

MetaData.propTypes = {
  parentName: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  handleMetadataChange: PropTypes.func.isRequired
};

export default MetaData;
