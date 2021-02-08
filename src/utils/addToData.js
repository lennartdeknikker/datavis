import fs from 'fs'
import parseUploadData from './parseUploadData'
import currentFile from '../data/test.json'

const addToData = (name, dateOfBirth, latitude, longitude, file) => {
  const newFridge = parseUploadData(name, dateOfBirth, latitude, longitude, file)
  currentFile.fridges.push(newFridge)
  fs.writeFile('src/data/test.json', JSON.stringify(currentFile, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
}

export default addToData