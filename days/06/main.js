const { pipe } = require('ramda')
const { readLines } = require('../../inputReading/readInput')

function splitByParenthesis (lines) {
  return lines.map((line) => line.split(')'))
}

function createRelationships (array) {
  const suns = array.reduce((suns, [sun, planet]) => {
    if (suns.has(sun)) suns.get(sun).push(planet)
    else suns.set(sun, [planet])
    return suns
  }, new Map())

  const planets = array.reduce((planets, [sun, planet]) => {
    planets.set(planet, sun)
    return planets
  }, new Map())

  return { planets, suns }
}

function countSuns (planet, planets) {
  if (planets.has(planet)) return 1 + countSuns(planets.get(planet), planets)
  return 0
}

function countOrbits ({ planets, suns }) {
  let numOrbits = 0
  for (const [planet, __] of planets) {
    numOrbits += countSuns(planet, planets)
  }
  return numOrbits
}

const INPUT_FILE = 'input.csv'
const doPart1 = pipe(readLines, splitByParenthesis, createRelationships, countOrbits)
console.log('part 1: ' + doPart1(__dirname, INPUT_FILE))
console.log('toto')
