const parseUploadFileName = (birthDate, name, originalFileName) => {
  const extensionRegex = /(?:\.([^.]+))?$/
  const extension = extensionRegex.exec(originalFileName)[0]
  const newName = name.replace(/\s+/g, '-').toLowerCase();
  return `${Date.now()}_${birthDate}_${newName}${extension}`
}

export default parseUploadFileName