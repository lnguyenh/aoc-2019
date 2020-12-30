const { pipe } = require('ramda')
const { readLines } = require('../../inputReading/readInput')

const INPUT_FILE = 'example.csv'
const doPart1 = pipe(readLines)
const doPart2 = pipe(readLines)
console.log('part 1: ' + doPart1(__dirname, INPUT_FILE))
console.log('part 2: ' + doPart2(__dirname, INPUT_FILE))
