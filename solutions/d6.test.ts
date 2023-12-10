import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d6'
import { readInput } from '../utils/fs'

describe('d6:p1', () => {
  it('should solve example case', () => {
    const input = `Time:      7  15   30
    Distance:  9  40  200`
    expect(part1(input)).toEqual(288)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d6.txt')
    expect(part1(input)).toEqual(1660968)
  })
})

describe('d6:p2', () => {
  it('should solve example case', () => {
    const input = `Time:      7  15   30
    Distance:  9  40  200`
    expect(part2(input)).toEqual(71503)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d6.txt')
    expect(part2(input)).toEqual(26499773)
  })
})
