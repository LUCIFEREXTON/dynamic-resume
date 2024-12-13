class ResumeBuilder {
  async buildResume(data) {
    try {
      const container = document.getElementById('resume-container');
      container.innerHTML = '';

      // Build Header
      container.appendChild(this.buildHeader(data.header));

      // Build Main Content Container
      const contentContainer = document.createElement('div');
      contentContainer.id = 'container';

      // Build Left Column
      const leftColumn = document.createElement('div');
      data.sections.leftColumn.forEach(section => {
        leftColumn.appendChild(this.buildSection(section));
      });

      // Build Right Column
      const rightColumn = document.createElement('div');
      data.sections.rightColumn.forEach(section => {
        rightColumn.appendChild(this.buildSection(section));
      });

      contentContainer.appendChild(leftColumn);
      contentContainer.appendChild(rightColumn);
      container.appendChild(contentContainer);
    } catch (error) {
      console.error('Error building resume:', error);
    }
  }

  buildHeader(headerData) {
    const header = document.createElement('header');

    const leftDiv = document.createElement('div');
    leftDiv.innerHTML = `
            <h1 id="name">${headerData.name}</h1>
            <h3 id="position" class="primary-color">${headerData.position}</h3>
        `;

    const contactDiv = document.createElement('div');
    contactDiv.id = 'contact';
    contactDiv.innerHTML = headerData.contact.map(item => `
            <a href="${item.link}" class="item">
                <span>${item.value}</span>
                <i class="bi ${item.icon} primary-color"></i>
            </a>
        `).join('');

    header.appendChild(leftDiv);
    header.appendChild(contactDiv);
    return header;
  }

  buildSection(section) {
    const sectionElement = document.createElement('section');
    sectionElement.id = section.type;

    switch (section.type) {
      case 'experience':
        sectionElement.innerHTML = this.buildExperience(section);
        break;
      case 'summary':
        sectionElement.innerHTML = this.buildSummary(section);
        break;
      case 'achievements':
        sectionElement.innerHTML = this.buildAchievements(section);
        break;
      case 'skills':
        sectionElement.innerHTML = this.buildSkills(section);
        break;
      case 'education':
        sectionElement.innerHTML = this.buildEducation(section);
        break;
    }

    return sectionElement;
  }

  buildExperience(section) {
    return `
            <h3>EXPERIENCE</h3>
            ${section.items.map(item => `
                <div class="body">
                    <div class="position">${item.position}</div>
                    <div class="company primary-color">${item.company}</div>
                    <div class="extra">
                        <div class="item">
                          <i class="bi bi-geo-alt primary-color"></i>
                          <span>${item.location}</span>
                        </div>
                        <div class="item">
                          <i class="bi bi-calendar3"></i>
                          <span>${item.duration.start} - ${item.duration.end}</span>
                        </div>
                    </div>
                    ${item.contributions.map(contribution => `
                        <div class="contribution">
                            <div class="title">${contribution.title}</div>
                            <div class="highlights">
                                <ul>
                                    ${contribution.points.map(point => `
                                        <li>${point}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        `;
  }

  buildSummary(section) {
    return `
            <h3>SUMMARY</h3>
            <p class="body">${section.content}</p>
        `;
  }

  buildAchievements(section) {
    return `
            <h3>KEY ACHIEVEMENTS</h3>
            <div class="body">
                ${section.items.map(item => `
                    <div class="item">
                        <i class="bi bi-lightning-charge-fill primary-color"></i>
                        <span>${item}</span>
                    </div>
                `).join('')}
            </div>
        `;
  }

  buildSkills(section) {
    return `
            <h3>SKILLS</h3>
            <div class="body">
                ${section.categories.map(category => `
                    <span class="primary-color">
                        <i class="bi ${category.icon}"></i>
                        ${category.label}:
                    </span>
                    <span>${category.skills}</span>
                `).join('')}
            </div>
        `;
  }

  buildEducation(section) {
    return `
            <h3>EDUCATION</h3>
            ${section.items.map(item => `
                <div class="body">
                    <div class="degree">${item.degree}</div>
                    <div class="institute primary-color">${item.institution}</div>
                    <div class="extra">
                        <i class="bi bi-calendar3"></i>
                        <span>${item.duration.start} - ${item.duration.end}</span>
                    </div>
                </div>
            `).join('')}
        `;
  }
}

// Basic Router
function navigateTo(path) {
  window.history.pushState({}, path, window.location.origin + path);
  handleRoute(path);
}

function handleRoute(path) {
  const container = document.getElementById('resume-container');
  container.innerHTML = '';
  path = path.replace('.html', '')
  path = path.replace('index', '')
  path = location.href.replace(location.origin, '')
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  if (path === '') {
    buildResumeFromJsonFile();
  } else if (path === '/generate') {
    buildGenerateOptions();
  } else if (path === '/generate/file') {
    buildFileUploadOption();
  } else if (path === '/generate/json') {
    buildJsonInputOption();
  } else if (path === '/generate/form') {
    buildFormOption();
  }
}

// Resume Builder for Root
async function buildResumeFromJsonFile() {
  try {
    const response = await fetch('resume.json');
    const data = await response.json();
    const builder = new ResumeBuilder();
    builder.buildResume(data);
  } catch (error) {
    console.error('Error loading resume:', error);
  }
}

// Generate Options
function buildGenerateOptions() {
  const container = document.getElementById('resume-container');
  container.innerHTML = `
    <h2>Select Option to Generate Resume</h2>
    <label><input type="radio" name="option" value="file" onclick="navigateTo('/generate/file')"> JSON File</label>
    <label><input type="radio" name="option" value="json" onclick="navigateTo('/generate/json')"> JSON Text</label>
    <label><input type="radio" name="option" value="form" onclick="navigateTo('/generate/form')"> Form</label>
  `;
}

// File Upload Option
function buildFileUploadOption() {
  const container = document.getElementById('resume-container');
  container.innerHTML = `
    <h2>Upload JSON File</h2>
    <input type="file" id="jsonFile" accept="application/json">
    <button onclick="handleFileUpload()">Upload</button>
  `;
}

function handleFileUpload() {
  const fileInput = document.getElementById('jsonFile');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = JSON.parse(e.target.result);
      const builder = new ResumeBuilder();
      builder.buildResume(data);
    };
    reader.readAsText(file);
  } else {
    alert('No file selected');
  }
}

// JSON Input Option
function buildJsonInputOption() {
  const container = document.getElementById('resume-container');
  container.innerHTML = `
    <h2>Paste JSON Text</h2>
    <textarea id="jsonText" rows="10" cols="50"></textarea>
    <button onclick="handleJsonText()">Submit</button>
  `;
}

function handleJsonText() {
  const jsonText = document.getElementById('jsonText').value;
  try {
    const data = JSON.parse(jsonText);
    const builder = new ResumeBuilder();
    builder.buildResume(data);
  } catch (error) {
    alert('Invalid JSON');
  }
}

// Form Option
function buildFormOption() {
  const container = document.getElementById('resume-container');
  container.innerHTML = `
    <h2>Fill Out Details</h2>
    <form id="resumeForm">
      <label>Name: <input type="text" name="name"></label><br>
      <label>Position: <input type="text" name="position"></label><br>
      <div id="experience">
        <h3>Experience</h3>
        <button type="button" onclick="addExperience()">Add More</button>
      </div>
      <button type="button" onclick="handleFormSubmit()">Create</button>
    </form>
  `;
}

function addExperience() {
  const experienceDiv = document.getElementById('experience');
  const newField = document.createElement('div');
  newField.innerHTML = `
    <label>Company: <input type="text" name="company"></label>
    <label>Position: <input type="text" name="position"></label>
    <label>Location: <input type="text" name="location"></label>
  `;
  experienceDiv.appendChild(newField);
}

function handleFormSubmit() {
  const formData = new FormData(document.getElementById('resumeForm'));
  const data = Object.fromEntries(formData.entries());
  const builder = new ResumeBuilder();
  builder.buildResume(data);
}

// Handle Initial Load and Popstate
window.onpopstate = () => handleRoute(window.location.pathname);
window.addEventListener('DOMContentLoaded', () => handleRoute(window.location.pathname));
