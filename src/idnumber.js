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
  ([ init, last ]) => Number(last) === checkDigit(init)
)

const isValidCitizenOrResident = R.pipe(
  substrAsNumber(10, 1),
  R.gt(2)
)

const is12thDigit8 = R.pipe(
  substrAsNumber(11, 1),
  R.equals(8)
)
const validatorsAndErrorMessages = [
  [
    startsWithIDNumberBirthdate, 'Not a valid date of birth'
  ],
  [ lastDigitIsValidCheckDigit, 'Check digit does not match'],
  [ has13Characters, 'Does not have 13 characters'],
  [ isValidCitizenOrResident, 'Is neither citizen nor resident'],
  [ is12thDigit8, 'The 12th digit is required to be 8']
]

/**
 * Validates if the string given is an ID number.
 *
 * ## Testing
 *
 * If you need a fake ID number for testing, use
 * [this](https://chris927.github.io/generate-sa-idnumbers/).
 *
 * @param {string} idnumber - The idnumber to validate.
 */
export const isValidSouthAfricanIDNumber = R.compose(
  R.allPass(validatorsAndErrorMessages.map(([v]) => v)), // take the validator, ignore the message
  normalizeIDNumber
)

/**
 * Normalizes a string representing an ID number.
 *
 * TODO: currently, if the ID number is invalid, it normalizes it to an empty
 * string, not sure this is a good idea.
 */
export const normalizeSouthAfricanIDNumber = v => isValidSouthAfricanIDNumber(v) ? v.replace(/\D/g, '') : ''

/**
 * For a given value, determines a list of validation errors.
 * 
 * @param {String} value
 */
export const getValidationErrors = v => {
  if (!v) {
    return [ 'No value given' ]
  }
  const errors = []
  const normalized = normalizeIDNumber(v)
  for (const [validator, message] of validatorsAndErrorMessages) {
    if (!validator(normalized)) {
      errors.push(message)
    }
  }
  return errors
}
