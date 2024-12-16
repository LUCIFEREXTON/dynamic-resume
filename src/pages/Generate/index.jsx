import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InputsForm from './InputsForm';
import Resume from '../Resume';

const Generate = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab = searchParams.get('tab') || 'paste-json';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [jsonState, setJsonState] = useState('{}');
  const [jsonForm, setJsonForm] = useState(JSON.parse(jsonState));


  useEffect(() => {
    setJsonForm(JSON.parse(jsonState));
  }, [jsonState]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setJsonState(JSON.stringify(json, null, 2));
          setActiveTab('paste-json'); // Switch to the JSON tab
        } catch (error) {
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonChange = (e) => {
    setJsonState(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setJsonState(JSON.stringify(jsonForm, null, 2));
    alert(`Form Submitted: Name: ${jsonState?.name}, Position: ${jsonState?.position}`);
  };

  return (
    <div id="maker-container">
      <Resume resumeData={jsonForm} />
      <div id="generate-container">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'paste-json' ? 'active' : ''}`}
            onClick={() => handleTabClick('paste-json')}
          >
            Paste JSON
          </button>
          <button
            className={`tab-button ${activeTab === 'upload-json' ? 'active' : ''}`}
            onClick={() => handleTabClick('upload-json')}
          >
            Upload JSON
          </button>
          <button
            className={`tab-button ${activeTab === 'fill-form' ? 'active' : ''}`}
            onClick={() => handleTabClick('fill-form')}
          >
            Fill Form
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'paste-json' && (
            <div id="paste-json-tab" className="tab-panel">
              <h3>Paste JSON</h3>
              <textarea
                id="paste-json-textarea"
                className="json-textarea"
                value={jsonState}
                onChange={handleJsonChange}
                rows="10"
                cols="50"
              ></textarea>
            </div>
          )}
          {activeTab === 'upload-json' && (
            <div id="upload-json-tab" className="tab-panel">
              <h3>Upload JSON</h3>
              <input
                id="upload-json-input"
                className="file-input"
                type="file"
                accept="application/json"
                onChange={handleFileUpload}
              />
            </div>
          )}
          {activeTab === 'fill-form' && (
            <div id="fill-form-tab" className="tab-panel">
              <form onSubmit={handleFormSubmit} id="resume-form">
                <InputsForm jsonState={jsonForm} onJsonChange={setJsonForm} />
                <button id="submit-btn" type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
