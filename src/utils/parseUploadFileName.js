const parseUploadFileName = (dateOfBirth, name, originalFileName) => {
  const extensionRegex = /(?:\.([^.]+))?$/
  const extension = extensionRegex.exec(originalFileName)[0]
  const newName = name.replace(/\s+/g, '-').toLowerCase();
  return `${Date.now()}_${dateOfBirth}_${newName}${extension}`
}

export default parseUploadFileName