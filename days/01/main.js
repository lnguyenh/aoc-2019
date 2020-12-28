const { pipe, sum } = require('ramda')
const { readInput } = require('../utils/readInput')

const INPUT_FILE = 'input.csv'

function getFuel (masses) {
  return masses.map((mass) => Math.floor(mass / 3) - 2)
}

function transformToNumber (textArray) {
  return textArray.map((text) => Number(text))
}

const doPart1 = pipe(
  readInput,
  transformToNumber,
  getFuel,
  sum
)

console.log('part 1: ' + doPart1(__dirname, INPUT_FILE))
console.log('part 2: ' + '')
