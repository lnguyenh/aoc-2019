const fs = require('fs')
const path = require('path')
const { pipe } = require('ramda')

const readFile = (directory, fileName) => {
  return fs.readFileSync(path.join(directory, 'data', fileName), 'utf8')
}

const readLines = pipe(readFile, (blob) => blob.split('\n'))

const readInputOneIntPerLine = pipe(readLines, (blob) => blob.map((value) => Number(value)))

const readInputOneLineWithNumbers = pipe(readFile, (blob) => blob.split(',').map((value) => Number(value)))

const readCsvInput = pipe(readLines, (blob) => blob.map((value) => value.split(',')))

const splitBy = (separator, array) => { return array.map((blob) => blob.split(separator)) }

module.exports = {
  readInputOneIntPerLine,
  readInputOneLineWithNumbers,
  readCsvInput,
  readLines,
  splitBy
}
