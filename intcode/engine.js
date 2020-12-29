const { update, pipe } = require('ramda')
const readlineSync = require('readline-sync')

function initializeProgram (array) {
  return { i: 0, program: array }
}

function getUserInput () {
  return Number(readlineSync.question('Intcode input: '))
}

function runProgram ({ i, program }) {
  const opCode = program[i].toString()
  const [, , mode2, mode1, code] = /^(\d)(\d)(\d)(\d\d)$/.exec(opCode.padStart(5, '0'))

  const param1 = mode1 === '0' ? program[program[i + 1]] : program[i + 1]
  const param2 = mode2 === '0' ? program[program[i + 2]] : program[i + 2]
  const param3 = program[i + 3]

  switch (code) {
    case '01':
      return runProgram({
        i: i + 4,
        program: update(program[i + 3], param1 + param2, program)
      })
    case '02':
      return runProgram({
        i: i + 4,
        program: update(program[i + 3], param1 * param2, program)
      })
    case '03':
      return runProgram({
        i: i + 2,
        program: update(program[i + 1], getUserInput(), program)
      })
    case '04':
      console.log('Intcode output: ' + param1)
      return runProgram({
        i: i + 2,
        program
      })
    case '05':
      if (param1 !== 0) {
        return runProgram({
          i: param2,
          program
        })
      } else {
        return runProgram({
          i: i + 3,
          program
        })
      }
    case '06':
      if (param1 === 0) {
        return runProgram({
          i: param2,
          program
        })
      } else {
        return runProgram({
          i: i + 3,
          program
        })
      }
    case '07':
      if (param1 < param2) {
        return runProgram({
          i: i + 4,
          program: update(param3, 1, program)
        })
      } else {
        return runProgram({
          i: i + 4,
          program: update(param3, 0, program)
        })
      }
    case '08':
      if (param1 === param2) {
        return runProgram({
          i: i + 4,
          program: update(param3, 1, program)
        })
      } else {
        return runProgram({
          i: i + 4,
          program: update(param3, 0, program)
        })
      }
    case '99':
      return { i, program }
  }
}

const runIntCode = pipe(initializeProgram, runProgram)

module.exports = { runIntCode }
