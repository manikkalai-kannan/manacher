import {
  addDelimiter,
  resetPosition,
  isSymmetric,
  linearExpansion,
  processString,
  longestPalindrome
} from '@/index'

describe('addDelimiter()', () => {
  it('should return with correct delimiter', () => {
    let sample = 'a'
    let result = addDelimiter(sample, '%')
    expect(result.indexOf('%')).toBe(0)
  })

  it('should return with correct string length', () => {
    let sample ='foo'
    let result = addDelimiter(sample)
    expect(result).toHaveLength(sample.length * 2 + 1)
  })

  it('should begin with delimiter', () => {
    expect(addDelimiter('foo', '|').split('').shift()).toBe('|')
  })

  it('should end with delimiter', () => {
    expect(addDelimiter('foo', '|').split('').pop()).toBe('|')
  })
})

describe('resetPosition()', () => {
  it('should return array with 3 elements', () => {
    let result = resetPosition(0, 0, 0, 0)
    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toHaveLength(3)
  })

  it('should set center to adjRight', () => {
    expect(resetPosition(2, 4, 6, 2)[1]).toBe(2)
  })

  it('should not set center to adjRight', () => {
    expect(resetPosition(1, 4, 5, 2)[1]).toBe(4)
  })

  it('should set left to mirror distance from center to right', () => {
    expect(resetPosition(1, 3, 5, 4)[0]).toBe(3)
  })

  it('should return right as itself', () => {
    expect(resetPosition(1, 3, 5, 4)[2]).toBe(5)
  })
})

describe('isSymmetric()', () => {
  it('should return boolean', () => {
    expect(typeof isSymmetric(0, 0, 0, 0, 'a')).toBe('boolean')
  })

  it('should be symmetric', () => {
    expect(isSymmetric(1, 1, 5, 5, '|a|b|a|')).toBeTruthy()
  })

  it('should not be symmetric', () => {
    expect(isSymmetric(1, 1, 5, 5, '|a|b|c|')).toBeFalsy()
  })
})

describe('linearExpansion()', () => {
  it('should return array of 2 elements', () => {
    expect(Array.isArray(linearExpansion(0, 0, 0, [0]))).toBeTruthy()
    expect(linearExpansion(0, 0, 0, [0])).toHaveLength(2)
  })

  it('should mirror palindrome string length', () => {
    expect(linearExpansion(3, 5, 5, [0, 0, 1, 0, 0, 0, 0])[1][4]).toBe(1)
  })

  it('should copy palindrome string length', () => {
    let result = linearExpansion(3, 5, 4, [0, 0, 3, 0, 0, 0, 0])
    expect(result[1][4]).toBe(0)
    expect(result[0]).toBe(3)
  })
})

describe('processString()', () => {
  it('should return array of n elements', () => {
    expect(Array.isArray(processString('foo', '|'))).toBeTruthy()
  })

  it('should return empty array if string is empty', () => {
    expect(processString('', '|')).toMatchObject([0])
  })
})

describe('longestPalindrome()', () => {
  it('should return string', () => {
    expect(typeof longestPalindrome('foo')).toBe('string')
  })

  it('should return correct answer', () => {
    expect(longestPalindrome('racecar')).toBe('racecar')
    expect(longestPalindrome('babcbabcbac')).toBe('abcbabcba')
    expect(longestPalindrome('43343321')).toBe('33433')
  })
})
