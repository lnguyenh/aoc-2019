const { pipe } = require('ramda')
const { runIntCode } = require('../intcode/engine')
const { readInputOneLineWithNumbers } = require('../utils/readInput')

const INPUT_FILE = 'input.csv'
const doIt = pipe(readInputOneLineWithNumbers, runIntCode)
doIt(__dirname, INPUT_FILE)
