const fs = require('fs')
const path = require('path')

function readInputOneIntPerLine (directory, fileName) {
  const filePath = path.join(directory, 'data', fileName)
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .map((value) => Number(value))
}

function readInputOneLineWithNumbers (directory, fileName) {
  const filePath = path.join(directory, 'data', fileName)
  return fs.readFileSync(filePath, 'utf8')
    .split(',')
    .map((value) => Number(value))
}

module.exports = { readInputOneIntPerLine, readInputOneLineWithNumbers }
