const { pipe } = require('ramda')
const { runIntCode } = require('../intcode/engine')
const { readInputOneLineWithNumbers } = require('../utils/readInput')

const INPUT_FILE = 'input.csv'
const doPart1 = pipe(readInputOneLineWithNumbers, runIntCode)
const doPart2 = pipe(readInputOneLineWithNumbers)
console.log('part 1: ' + doPart1(__dirname, INPUT_FILE))
console.log('part 2: ' + doPart2(__dirname, INPUT_FILE))
