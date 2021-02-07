import multer from 'multer';
import upload from '../utils/upload';

export async function post(req, res, next) {
  if (req) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) console.log('A Multer error occurred when uploading.', err)
      else if (err) console.log('An unknown error occurred when uploading.', err)
    
      console.log('image uploaded',req.file)
      res.redirect('/')
    })    
  }
  else next();
}