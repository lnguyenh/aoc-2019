const MIN = 271973
const MAX = 785961

function meetsCriteria (n, isPart2) {
  const s = n.toString()
  const match = s.match(/((.)\2)(.)*((.)\4)*/)
  if (!match) return false
  if (!/^(?=\d{6}$)1*2*3*4*5*6*7*8*9*$/.exec(s)) return false
  if (isPart2) {
    const x = match.slice(1)
    console.log(x)
    if (x.every((m) => {
      if (m && m.length === 2) {
        const t = m.slice(-1).repeat(3)
        console.log(t, s)
        if (s.includes(t)) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    })) return false
  }
  return true
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
let value = generator2.next().value
while (value) {
  counter2++
  value = generator2.next().value
  console.log(value)
}

console.log('part 1: ' + counter1)
console.log('part 2: ' + counter2)
console.log('part 2: ' + meetsCriteria(467779, true))
