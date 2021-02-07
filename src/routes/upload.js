import multer from 'multer';

const parseFileName = (birthDate, name, originalFileName) => {
  const extension = getExtension(originalFileName)
  const newName = name.replace(/\s+/g, '-').toLowerCase();
  return `${Date.now()}_${birthDate}_${newName}${extension}`
}

const getExtension = (string) => {
  const extensionRegex = /(?:\.([^.]+))?$/
  const extension = extensionRegex.exec(string)[0]
  return extension
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {console.log(req.body), cb(null, './static/images/upload')},
  filename: (req, file, cb) => cb(null, parseFileName(req.body.birthdate, req.body.name, file.originalname))
})

const upload = multer({ storage: storage }).single('picture')

export async function post(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log('🚀 ~ err', err)
      // A Multer error occurred when uploading.
    } else if (err) {
      console.log('🚀 ~ err', err)
      // An unknown error occurred when uploading.
    }
    console.log(req.file)
    // Everything went fine.
  })
  next();
}