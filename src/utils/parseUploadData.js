const testFileData = {
  fieldname: 'picture',
  originalname: 'IMG_20210201_231303.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './static/images/upload',
  filename: '1612806710913_2021-02-05_lennart.jpg',
  path: 'static/images/upload/1612806710913_2021-02-05_lennart.jpg',
  size: 3697475
}

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