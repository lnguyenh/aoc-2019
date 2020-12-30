const { pipe, curry } = require('ramda')
const { readLines, splitBy } = require('../../inputReading/readInput')

function createRelationships (array) {
  const planets = array.reduce((planets, [sun, planet]) => {
    planets.set(planet, sun)
    return planets
  }, new Map())
  return planets
}

function countSuns (planet, planets) {
  if (planets.has(planet)) return 1 + countSuns(planets.get(planet), planets)
  return 0
}

function countOrbits (planets) {
  let numOrbits = 0
  for (const [planet, __] of planets) {
    numOrbits += countSuns(planet, planets)
  }
  return numOrbits
}

function _getTransfersForPlanet (distance, planet, planets) {
  if (planets.has(planet)) {
    const transfers = _getTransfersForPlanet(distance + 1, planets.get(planet), planets)
    transfers.set(planet, distance)
    return transfers
  } else {
    // Last planet
    return new Map()
  }
}

const getTransfersForPlanet = curry(_getTransfersForPlanet)(-1)

function getSantasAndMyTransfers (planets) {
  const santasTransfers = getTransfersForPlanet('SAN', planets)
  const myTransfers = getTransfersForPlanet('YOU', planets)
  return [santasTransfers, myTransfers]
}

function getMinimumTransfers ([santasTransfers, myTransfers]) {
  let meetingPoint = { sun: 'YOU', combinedDistance: Infinity }
  for (const [sun, santasDistance] of santasTransfers) {
    if (myTransfers.has(sun)) {
      const combinedDistance = myTransfers.get(sun) + santasDistance
      if (combinedDistance < meetingPoint.combinedDistance) {
        meetingPoint = { sun, combinedDistance }
      }
    }
  }
  return meetingPoint.combinedDistance
}

const INPUT_FILE = 'input.csv'
const doPart1 = pipe(readLines, curry(splitBy)(')'), createRelationships, countOrbits)
const doPart2 = pipe(readLines, curry(splitBy)(')'), createRelationships, getSantasAndMyTransfers, getMinimumTransfers)
console.log('part 1: ' + doPart1(__dirname, INPUT_FILE))
console.log('part 2: ' + doPart2(__dirname, INPUT_FILE))
