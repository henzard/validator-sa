import { isValidSouthAfricanIDNumber, normalizeSouthAfricanIDNumber, getValidationErrors } from '../'

describe('South African ID number validation', () => {

  it('validates a valid one as valid', () => expect(isValidSouthAfricanIDNumber('9307184896082')).toBe(true))

  it('validates an invalid one as invalid', () => expect(isValidSouthAfricanIDNumber('9307184896083')).toBe(false))

  it('marks a valid but non-normalized ID number as valid', () =>
    expect(isValidSouthAfricanIDNumber('9307184 896082')).toBe(true)
  )

  it('marks an ID number with invalid citizen/resident digit as invalid', () => {
    const idnoCitizen = '9307184896082'
    const idnoResident = '9307184896181'
    const idnoNeitherResidentNorCitizen = '9307184896280'
    expect(isValidSouthAfricanIDNumber(idnoCitizen)).toBe(true)
    expect(isValidSouthAfricanIDNumber(idnoResident)).toBe(true)
    expect(isValidSouthAfricanIDNumber(idnoNeitherResidentNorCitizen)).toBe(false)
  })

  it('ensures the 12th digit is 8', () => {
    const idnoCitizen = '9307184896082'
    const idnoInvalid12thDigit = '9307184896074'
    expect(isValidSouthAfricanIDNumber(idnoCitizen)).toBe(true)
    expect(isValidSouthAfricanIDNumber(idnoInvalid12thDigit)).toBe(false)
  })
})

describe('South African ID number normalization', () => {
  it('normalizes a valid id number', () => expect(normalizeSouthAfricanIDNumber(' 9307184   \n896 082  ')).toBe('9307184896082'))
  it('becomes an empty string on invalid id number', () => {
    expect(normalizeSouthAfricanIDNumber('123')).toBe('')
  })
})

describe('validation errors', () => {
  it('provides a list of validation errors', () => {
    expect(getValidationErrors('123')).toStrictEqual([
      'Check digit does not match',
      'Does not have 13 characters',
      'The 12th digit is required to be 8'
    ])
    expect(getValidationErrors('9922019999999')).toStrictEqual([
      'Not a valid date of birth',
      'Check digit does not match',
      'Is neither citizen nor resident',
      'The 12th digit is required to be 8'
    ])
  })
  it('provides an empty list, if idnumber is valid', () => {
    expect(getValidationErrors('9307184896181')).toStrictEqual([])
  })
})