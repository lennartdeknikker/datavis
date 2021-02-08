import fs from 'fs'
import currentFile from '../data/test.json'

const addToData = (file) => {
  console.log(currentFile.fridges)
  currentFile.fridges.push(file)
  fs.writeFile('src/data/test.json', JSON.stringify(currentFile, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
}

export default addToData