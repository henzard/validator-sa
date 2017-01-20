import * as R from 'ramda'

const normalizeIDNumber = v => v && v.replace(/\D/g, '')

const substrAsNumber = (start, howMany) => s => s && Number(s.substr(start, howMany))

const has13Characters = v => v && v.length === 13

const checkDigit = R.pipe(
  s => s.replace(/\D/g, '').split('').map(d => Number(d)),
  R.reverse,
  arr => arr.map((d, ix) => {
    if (ix % 2 === 0) {
      d *= 2
      if (d > 9) {
        d -= 9
      }
    }
    return d
  }).reduce((memo, d) => memo += d, 0),
  sum => sum * 9 % 10
)

const startsWithIDNumberBirthdate = R.allPass([
  R.pipe(substrAsNumber(2, 2), R.gte(12)),
  R.pipe(substrAsNumber(4, 2), R.gte(31)),
])

export const lastDigitIsValidCheckDigit = R.pipe(
  R.splitAt(-1),
  ([ init, last ]) => last == checkDigit(init)
)

export const isValidSouthAfricanIDNumber = R.compose(
  R.allPass([
    startsWithIDNumberBirthdate,
    lastDigitIsValidCheckDigit,
    has13Characters,
  ]),
  normalizeIDNumber
)

export const normalizeSouthAfricanIDNumber = v => isValidSouthAfricanIDNumber(v) ? v.replace(/\D/g, '') : ''
