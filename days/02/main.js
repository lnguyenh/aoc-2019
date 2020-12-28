const { update, pipe, clone } = require('ramda')
const { readInputOneLineWithNumbers } = require('../utils/readInput')

function restoreGravityAssist (array) {
  const clonedArray = clone(array)
  clonedArray[1] = 12
  clonedArray[2] = 2
  return clonedArray
}

function initializeProgram (array) { return { i: 0, program: array } }

function runProgram ({ i, program }) {
  switch (program[i]) {
    case 1:
      return runProgram({
        i: i + 4,
        program: update(program[i + 3], program[program[i + 1]] + program[program[i + 2]], program)
      }
      )
    case 2:
      return runProgram({
        i: i + 4,
        program: update(program[i + 3], program[program[i + 1]] * program[program[i + 2]], program)
      })
    case 99:
      return { i, program }
  }
}

const INPUT_FILE = 'input.csv'
const doPart1 = pipe(readInputOneLineWithNumbers, restoreGravityAssist, initializeProgram, runProgram)
const doPart2 = pipe(readInputOneLineWithNumbers)
console.log('part 1: ' + doPart1(__dirname, INPUT_FILE).program[0])
console.log('part 2: ' + doPart2(__dirname, INPUT_FILE))
