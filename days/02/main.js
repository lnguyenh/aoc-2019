const { update, pipe, clone } = require('ramda')
const { readInputOneLineWithNumbers } = require('../utils/readInput')

function restoreGravityAssist (array) {
  return patchArray(array, 12, 2)
}

function patchArray (array, noun, verb) {
  const clonedArray = clone(array)
  clonedArray[1] = noun
  clonedArray[2] = verb
  return clonedArray
}

function initializeProgram (array) {
  return { i: 0, program: array }
}

function extractAnswer (state) { return state.program[0] }

function runProgram ({ i, program }) {
  switch (program[i]) {
    case 1:
      return runProgram({
        i: i + 4,
        program: update(program[i + 3], program[program[i + 1]] + program[program[i + 2]], program)
      })
    case 2:
      return runProgram({
        i: i + 4,
        program: update(program[i + 3], program[program[i + 1]] * program[program[i + 2]], program)
      })
    case 99:
      return { i, program }
  }
}

function findNounAndVerb (program) {
  for (let noun = 0; noun < 99; noun++) {
    for (let verb = 0; verb < 99; verb++) {
      if (getProgramAnswer(patchArray(program, noun, verb)) === 19690720) {
        return 100 * noun + verb
      }
    }
  }
  return null
}

const getProgramAnswer = pipe(initializeProgram, runProgram, extractAnswer)

const INPUT_FILE = 'input.csv'
const doPart1 = pipe(readInputOneLineWithNumbers, restoreGravityAssist, getProgramAnswer)
const doPart2 = pipe(readInputOneLineWithNumbers, findNounAndVerb)
console.log('part 1: ' + doPart1(__dirname, INPUT_FILE))
console.log('part 2: ' + doPart2(__dirname, INPUT_FILE))
