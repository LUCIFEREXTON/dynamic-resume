import { get, isEmpty } from "lodash"

export function verifyMetadata(metadata) {
  const validMetadataFields = ["primaryColor", "textPrimaryColor", "textSecondaryColor", "resumeBackgroundColor", "borderColor"]

  return validMetadataFields.every(field =>
    !get(metadata, field, false) ||
    typeof get(metadata, field) === "string"
  )
}

export function verifyHeader(header) {
  return get(header, 'name', false) &&
    get(header, 'position', false) &&
    get(header, 'contact', []).every(contact => {
      return get(contact, 'type', false) &&
        get(contact, 'value', false) &&
        get(contact, 'icon', false) &&
        (get(contact, 'type') === 'url' ? (get(contact, 'link', false) && get(contact, 'icon', false)) : true) &&
        (get(contact, 'icon', false) ? get(contact, 'icon').startsWith('bi-') : true) &&
        ['email', 'phone', 'url'].includes(get(contact, 'type'))
  })
}

export function verifySection(section) {
  if (isEmpty(section) || !['experience', 'summary', 'skills', 'education', 'achievements'].includes(section.type)) {
    return false
  }

  switch (section["type"]) {
    case "experience":
      return !isEmpty(section["items"]) && section["items"].every(item => {
        return get(item, 'position', false) &&
          get(item, 'company', false) &&
          get(item, 'contributions', []).every(contribution => {
            return get(contribution, 'title', false) &&
              get(contribution, 'highlights', []).every(highlight => typeof highlight === 'string')
          })
      })
    case "summary":
      return typeof get(section, 'content', null) === 'string'
    case "skills":
      return !isEmpty(section["categories"]) && section["categories"].every(category => {
        return get(category, 'label', false) &&
          get(category, 'icon', false) &&
          get(category, 'skills', false) &&
          get(category, 'icon').startsWith('bi-')
      })
    case "education":
      return !isEmpty(section["items"]) && section["items"].every(item => {
        return get(item, 'degree', false) &&
          get(item, 'institution', false)
      })
    case "achievements":
    return !isEmpty(section["items"]) && section["items"].every(item => typeof item === 'string')
  }
}

export function verifyJsonSchemaFields(data) {
  const metaData = get(data, 'metadata', null)
  const header = get(data, 'header', null)
  const leftSection = get(data, 'sections.leftColumn', null)
  const rightSection = get(data, 'sections.rightColumn', null)

  if (isEmpty(header) || isEmpty(leftSection) || isEmpty(rightSection)) {
    return false
  }

  return verifyMetadata(metaData) && verifyHeader(header) && leftSection.every(verifySection) && rightSection.every(verifySection)
}
