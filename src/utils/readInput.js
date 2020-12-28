const fs = require('fs')
const path = require('path')

function readInput (directory, fileName) {
  const filePath = path.join(directory, 'data', fileName)
  return fs.readFileSync(filePath, 'utf8').split('\n')
}

module.exports = { readInput }
