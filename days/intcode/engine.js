const { update, pipe } = require('ramda')

function initializeProgram (array) {
  return { i: 0, program: array }
}

function runProgram ({ i, program }) {
  // const opCode = program[i].toString.padStart(6, '0')
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

const runIntCode = pipe(initializeProgram, runProgram)

module.exports = { runIntCode }
