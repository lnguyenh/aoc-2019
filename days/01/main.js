const { pipe, sum } = require('ramda')
const { readInputOneIntPerLine } = require('../utils/readInput')

function getFuelsForMasses (masses) {
  return masses.map((mass) => Math.floor(mass / 3) - 2)
}

function getTotalFuel (fuelArray) {
  const reduced = getFuelsForMasses(fuelArray).filter((v) => v > 0)
  const total = sum(fuelArray)
  if (reduced.length === 0) return total
  return total + getTotalFuel(reduced)
}

const INPUT_FILE = 'input.csv'
const doPart1 = pipe(readInputOneIntPerLine, getFuelsForMasses, sum)
const doPart2 = pipe(readInputOneIntPerLine, getFuelsForMasses, getTotalFuel)
console.log('part 1: ' + doPart1(__dirname, INPUT_FILE))
console.log('part 2: ' + doPart2(__dirname, INPUT_FILE))
