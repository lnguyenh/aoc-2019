const { update, pipe } = require('ramda')
const readlineSync = require('readline-sync')

function initializeProgram (array) {
  return { i: 0, program: array }
}

function getInput () {
  return Number(readlineSync.question('Intcode input: '))
}

function runProgram ({ i, program }) {
  const opCode = program[i].toString()
  const [__, mode3, mode2, mode1, code] = /^(\d)(\d)(\d)(\d\d)$/.exec(opCode.padStart(5, '0'))

  const val1 = mode1 === '0' ? program[program[i + 1]] : program[i + 1]
  const val2 = mode2 === '0' ? program[program[i + 2]] : program[i + 2]
  const val3 = program[i + 3]

  switch (code) {
    case '01':
      return runProgram({
        i: i + 4,
        program: update(program[i + 3], val1 + val2, program)
      })
    case '02':
      return runProgram({
        i: i + 4,
        program: update(program[i + 3], val1 * val2, program)
      })
    case '03':
      return runProgram({
        i: i + 2,
        program: update(program[i + 1], getInput(), program)
      })
    case '04':
      console.log('Intcode output: ' + val1)
      return runProgram({
        i: i + 2,
        program
      })
    case '05':
      if (val1 !== 0) {
        return runProgram({
          i: val2,
          program
        })
      } else {
        return runProgram({
          i: i + 3,
          program
        })
      }
    case '06':
      if (val1 === 0) {
        return runProgram({
          i: val2,
          program
        })
      } else {
        return runProgram({
          i: i + 3,
          program
        })
      }
    case '07':
      if (val1 < val2) {
        return runProgram({
          i: i + 4,
          program: update(val3, 1, program)
        })
      } else {
        return runProgram({
          i: i + 4,
          program: update(val3, 0, program)
        })
      }
    case '08':
      if (val1 === val2) {
        return runProgram({
          i: i + 4,
          program: update(val3, 1, program)
        })
      } else {
        return runProgram({
          i: i + 4,
          program: update(val3, 0, program)
        })
      }
    case '99':
      return { i, program }
  }
}

const runIntCode = pipe(initializeProgram, runProgram)

module.exports = { runIntCode }
