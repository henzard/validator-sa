import { isValidSouthAfricanIDNumber, normalizeSouthAfricanIDNumber } from '../'

describe('South African ID number validation', () => {

  it('validates a valid one as valid', () => expect(isValidSouthAfricanIDNumber('9307184896082')).toBe(true))

  it('validates an invalid one as invalid', () => expect(isValidSouthAfricanIDNumber('9307184896083')).toBe(false))

})

describe('South African ID number normalization', () => {
  it('normalizes a valid id number', () => expect(normalizeSouthAfricanIDNumber(' 9307184   \n896 082  ')).toBe('9307184896082'))
})

