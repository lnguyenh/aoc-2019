const MIN = 271973
const MAX = 785961

function meetsCriteria (n, isPart2) {
  const s = n.toString()
  if (!/((.)\2)/.exec(s)) return false
  if (!/^(?=\d{6}$)1*2*3*4*5*6*7*8*9*$/.exec(s)) return false
  if (isPart2) {
    const s2 = s.split('').reduce(countConsecutiveCharacters, [])
    const counts = s2.map((o) => o.count)
    if (!counts.includes(2)) return false
  }
  return true
}

function countConsecutiveCharacters (acc, curr) {
  const lastCharacter = acc.length === 0 ? '?' : acc[acc.length - 1].character
  if (curr === lastCharacter) {
    acc[acc.length - 1].count = acc[acc.length - 1].count + 1
  } else {
    acc.push({ character: curr, count: 1 })
  }
  return acc
}

function * passwordGenerator (min, max, isPart2) {
  let value = min
  while (value <= max) {
    value += 1
    if (meetsCriteria(value, isPart2)) yield value
  }
}

const generator1 = passwordGenerator(MIN, MAX, false)
let counter1 = 0
while (generator1.next().value) {
  counter1++
}

const generator2 = passwordGenerator(MIN, MAX, true)
let counter2 = 0
while (generator2.next().value) {
  counter2++
}

console.log('part 1: ' + counter1)
console.log('part 2: ' + counter2)
