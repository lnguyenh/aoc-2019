const { pipe, sum } = require('ramda')
const { readCsvInput } = require('../../inputReading/readInput')

class Path {
  constructor (instructions) {
    this.instructions = instructions
    this.points = new Array(50000)
    this.length = 0
    this.applyInstructions()
    this.points.length = this.length
    this.intersections = new Map()
  }

  applyInstructions () {
    for (const instruction of this.instructions) {
      this.applyInstruction(instruction)
    }
  }

  addPoints (vector, times, trackIntersections) {
    const origin = this.length > 0 ? this.points[this.length - 1] : [0, 0]
    for (let i = 1; i <= times; i++) {
      const point = [origin[0] + vector[0] * i, origin[1] + vector[1] * i]
      this.points[this.length] = point
      this.length++

      if (trackIntersections) {
        const key = getKey(point)
        if (this.intersections.has(key) && this.intersections.get(key) === -1) {
          this.intersections.set(key, this.length)
        }
      }
    }
  }

  applyInstruction (instruction, trackIntersections = false) {
    const [__, direction, distanceAsText] = /^(\w)(\d+)$/.exec(instruction)
    const distance = Number(distanceAsText)
    switch (direction) {
      case 'R':
        return this.addPoints([1, 0], distance, trackIntersections)
      case 'L':
        return this.addPoints([-1, 0], distance, trackIntersections)
      case 'U':
        return this.addPoints([0, 1], distance, trackIntersections)
      case 'D':
        return this.addPoints([0, -1], distance, trackIntersections)
    }
  }

  loadIntersections (intersections) {
    for (const intersection of intersections) {
      this.intersections.set(getKey(intersection), -1)
    }
    // very hacky, reset this.length
    this.length = 0
    for (const instruction of this.instructions) {
      this.applyInstruction(instruction, true)
    }
  }
}

function getPaths (array) {
  return array.map((instructions) => new Path(instructions))
}

function getKey (point) {
  return `${point[0]}z${point[1]}`
}

function getPointFromKey (key) {
  return key.split('z').map((a) => Number(a))
}

function getIntersections (paths) {
  const pointOccurrences = new Map()
  for (const path of paths) {
    const seenForPath = new Map()
    for (const point of path.points) {
      const key = getKey(point)
      if (pointOccurrences.has(key) && !seenForPath.has(key)) pointOccurrences.set(key, 2)
      else {
        pointOccurrences.set(key, 1)
        seenForPath.set(key, 1)
      }
    }
  }
  const intersection = []
  for (const [key, numOccurrences] of pointOccurrences) {
    if (numOccurrences >= 2) {
      intersection.push(getPointFromKey(key))
    }
  }
  return intersection
}

function getSmallestManhattan (points) {
  return Math.min(...points.map((point) => sum((point.map(Math.abs)))))
}

const INPUT_FILE = 'input.csv'
const paths = pipe(readCsvInput, getPaths)(__dirname, INPUT_FILE)
const intersections = getIntersections(paths)
const intersectionDistances = paths.map((path) => {
  path.loadIntersections(intersections)
  return path.intersections
})
const combinedDistances = []
for (const [key, __] of intersectionDistances[0]) {
  combinedDistances.push(intersectionDistances[0].get(key) + intersectionDistances[1].get(key))
}

console.log('part 1: ' + getSmallestManhattan(intersections))
console.log('part 2: ' + Math.min(...combinedDistances))
