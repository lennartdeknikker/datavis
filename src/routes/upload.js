import multer from 'multer';
import addToData from '../utils/addToData';
import upload from '../utils/upload';

export async function post(req, res, next) {
  if (req) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) console.log('A Multer error occurred when uploading.', err)
      else if (err) console.log('An unknown error occurred when uploading.', err)
      addToData(req.body.name, req.body.dateOfBirth, req.file)
      res.redirect('/')
    })    
  }
  else next();
}