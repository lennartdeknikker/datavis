import multer from 'multer';
import parseUploadFileName from '../utils/parseUploadFileName'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {console.log(req.body), cb(null, './static/images/upload')},
  filename: (req, file, cb) => cb(null, parseUploadFileName(req.body.birthdate, req.body.name, file.originalname))
})

const upload = multer({ storage: storage }).single('picture')

export default upload