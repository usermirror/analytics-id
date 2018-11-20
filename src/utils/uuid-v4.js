const dec2hex = []

for (let i = 0; i <= 15; i++) {
  dec2hex.push(i.toString(16))
}

export function v4() {
  let value = ''

  for (var i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      value += '-'
    } else if (i === 15) {
      value += 4
    } else if (i === 20) {
      value += dec2hex[(Math.random() * 4) | (0 + 8)]
    } else {
      value += dec2hex[(Math.random() * 15) | 0]
    }
  }

  return value
}

export default v4
