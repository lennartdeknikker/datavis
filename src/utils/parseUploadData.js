const parseUploadData = (name, dateOfBirth, latitude, longitude, file) => {

  const parsedFile = {
    name: name,
    dateOfBirth: dateOfBirth,
    location: [longitude, latitude],
    photos: [
      {
        name: file.filename,
        path: file.path.split("static/")[1],
        mimetype: file.mimetype,
        size: file.size
      }
    ]
  }

  return parsedFile
}




export default parseUploadData