const { pipe, sum, last, intersection } = require('ramda')
const { readCsvInput } = require('../utils/readInput')

class Path {
  constructor (instructions) {
    this.points = new Array(50000)
    this.length = 0
    this.applyInstructions(instructions)
    this.points.length = this.length
  }

  applyInstructions (instructions) {
    for (const instruction of instructions) {
      this.applyInstruction(instruction)
    }
  }

  addPoints (vector, times) {
    const origin = this.length ? this.points[this.length - 1] : [0, 0]
    for (let i = 1; i <= times; i++) {
      this.points[this.length] = [origin[0] + vector[0] * i, origin[1] + vector[1] * i]
      this.length++
    }
  }

  applyInstruction (instruction) {
    const [__, direction, distanceAsText] = /^(\w)(\d+)$/.exec(instruction)
    const distance = Number(distanceAsText)
    switch (direction) {
      case 'R':
        return this.addPoints([1, 0], distance)
      case 'L':
        return this.addPoints([-1, 0], distance)
      case 'U':
        return this.addPoints([0, 1], distance)
      case 'D':
        return this.addPoints([0, -1], distance)
    }
  }
}

function getPoints (array) {
  return array.map((instructions) => new Path(instructions).points)
}

function getKey (point) {
  return `${point[0]}z${point[1]}`
}

function getIntersections (array) {
  const pointOccurrences = new Map()
  for (const points of array) {
    for (const point of points) {
      const key = getKey(point)
      if (pointOccurrences.has(key)) pointOccurrences.set(key, 2)
      else pointOccurrences.set(key, 1)
    }
  }
  const intersection = []
  for (const [key, numOccurrences] of pointOccurrences) {
    if (numOccurrences === 2) intersection.push(key.split('z').map((a) => Number(a)))
  }
  return intersection
}

function getSmallestManhattan (points) {
  return Math.min(...points.map((point) => sum((point.map(Math.abs)))))
}

const INPUT_FILE = 'input.csv'
const doPart1 = pipe(readCsvInput, getPoints, getIntersections, getSmallestManhattan)
const doPart2 = pipe(readCsvInput)
console.log('part 1: ' + doPart1(__dirname, INPUT_FILE))
console.log('part 2: ' + doPart2(__dirname, INPUT_FILE))
