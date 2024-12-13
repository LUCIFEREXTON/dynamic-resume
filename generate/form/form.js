// Predefined options for dropdowns
const contactTypeOptions = ["phone", "email", "linkedin", "github", "website"];
const sectionTypeOptions = ["experience", "summary", "achievements", "skills", "education"];



// Render Metadata Section
function renderMetadataSection(metadata) {
  const section = document.createElement("section");
  section.innerHTML = `
    <h3>Metadata</h3>
    <label>Primary Color: <input type="color" name="metadata.primaryColor" value="${metadata.primaryColor}"></label>
    <label>Background Color: <input type="color" name="metadata.backgroundColor" value="${metadata.backgroundColor}"></label>
  `;
  return section;
}

// Render Dropdown
function renderDropdown(options, name, selectedValue = "") {
  return `
    <select name="${name}">
      ${options
      .map(option => `<option value="${option}" ${option === selectedValue ? "selected" : ""}>${option}</option>`)
      .join("")}
    </select>
  `;
}

function renderContact(contact, index) {
  return `
    <div class="contact">
      <label>Type: ${renderDropdown(contactTypeOptions, `header.contact[${index}].type`, contact.type)}</label>
      <label>Value: <input type="text" name="header.contact[${index}].value" value="${contact.value || ""}"></label>
      <label>Icon: <input type="text" name="header.contact[${index}].icon" value="${contact.icon || ""}"></label>
      <label>Link: <input type="text" name="header.contact[${index}].link" value="${contact.link || ""}"></label>
    </div>
  `;
}

function addContact() {
  const contactSection = document.getElementById("contact-section");
  const index = contactSection.querySelectorAll(".contact").length;
  contactSection.insertAdjacentHTML(
    "beforeend",
    renderContact({}, index)
  );
}

// Render Header Section
function renderHeaderSection(header) {
  const section = document.createElement("section");
  section.innerHTML = `
    <h3>Header</h3>
    <label>Name: <input type="text" name="header.name" value="${header.name}"></label>
    <label>Position: <input type="text" name="header.position" value="${header.position}"></label>
    <div id="contact-section">
      <h4>Contact</h4>
      ${header.contact.map((c, i) => renderContact(c, i)).join("")}
      <button type="button" onclick="addContact()">Add More Contact</button>
    </div>
  `;
  return section;
}

function renderExperienceItem(item, index, path) {
  return `
    <div class="experience-item">
      <label>Position: <input type="text" name="${path}[${index}].position" value="${item.position || ""}"></label>
      <label>Company: <input type="text" name="${path}[${index}].company" value="${item.company || ""}"></label>
      <label>Location: <input type="text" name="${path}[${index}].location" value="${item.location || ""}"></label>
      <label>Start: <input type="text" name="${path}[${index}].duration.start" value="${item.duration?.start || ""}"></label>
      <label>End: <input type="text" name="${path}[${index}].duration.end" value="${item.duration?.end || ""}"></label>
    </div>
  `;
}

function renderExperience(experience, index, path) {
  return `
    <div id="experience-items-${index}">
      ${experience.items
      .map((item, i) => renderExperienceItem(item, i, `${path}[${index}].items`))
      .join("")}
      <button type="button" onclick="addExperienceItem(${index}, '${path}[${index}].items')">Add More Experience</button>
    </div>
  `;
}

function renderSection(section, index, path) {
  return `
    <div class="section">
      <label>Type: ${renderDropdown(sectionTypeOptions, `${path}[${index}].type`, section.type)}</label>
      ${section.type === "experience" ? renderExperience(section, index, path) : ""}
    </div>
  `;
}

// Add a new section dynamically
function addSection(columnId, path) {
  const column = document.getElementById(columnId);
  const index = column.querySelectorAll(".section").length;
  column.insertAdjacentHTML("beforeend", renderSection({}, index, path));
}

// Render Sections (Left and Right Columns)
function renderSections(sections) {
  const section = document.createElement("section");
  section.innerHTML = `
    <h3>Sections</h3>
    <div id="left-column">
      <h4>Left Column</h4>
      ${sections.leftColumn.map((s, i) => renderSection(s, i, "sections.leftColumn")).join("")}
      <button type="button" onclick="addSection('left-column', 'sections.leftColumn')">Add More</button>
    </div>
    <div id="right-column">
      <h4>Right Column</h4>
      ${sections.rightColumn.map((s, i) => renderSection(s, i, "sections.rightColumn")).join("")}
      <button type="button" onclick="addSection('right-column', 'sections.rightColumn')">Add More</button>
    </div>
  `;
  return section;
}

function addExperienceItem(sectionIndex, path) {
  const experienceDiv = document.getElementById(`experience-items-${sectionIndex}`);
  const index = experienceDiv.querySelectorAll(".experience-item").length;
  experienceDiv.insertAdjacentHTML(
    "beforeend",
    renderExperienceItem({}, index, path)
  );
}

// Serialize Form Data
function serializeForm(container) {
  const formData = new FormData(container);
  const data = {};
  for (const [key, value] of formData.entries()) {
    setNestedValue(data, key, value);
  }
  return data;
}

function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  keys.reduce((o, k, i) => (o[k] = keys.length - 1 === i ? value : o[k] || {}), obj);
}

// Render form based on JSON structure
function renderForm(json, container) {
  container.innerHTML = ""; // Clear the form

  // Metadata
  container.appendChild(renderMetadataSection(json.metadata));

  // Header
  container.appendChild(renderHeaderSection(json.header));

  // Sections
  container.appendChild(renderSections(json.sections));

  // Submit Button
  const submitButton = document.createElement("button");
  submitButton.id = "submit-form";
  submitButton.textContent = "Submit";
  container.appendChild(submitButton);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("form-container");

  // Load initial JSON structure
  const initialJson = {
    metadata: {
      primaryColor: "#0b57d0",
      backgroundColor: "#efefef"
    },
    header: {
      name: "",
      position: "",
      contact: []
    },
    sections: {
      leftColumn: [],
      rightColumn: []
    }
  };

  // Render the form
  renderForm(initialJson, container);

  // Submit button handler
  document.getElementById("submit-form").addEventListener("click", () => {
    const formData = serializeForm(container);
    console.log("Generated JSON:", formData);
    alert("JSON generated! Check the console.");
  });
});
