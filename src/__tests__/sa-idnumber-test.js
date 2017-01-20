import { isValidSouthAfricanIDNumber } from '../'

describe('South African ID number validation', () => {

  it('validates a valid one as valid', () => expect(isValidSouthAfricanIDNumber('9307184896082')).toBe(true))

  it('validates an invalid one as invalid', () => expect(isValidSouthAfricanIDNumber('9307184896083')).toBe(false))

})
