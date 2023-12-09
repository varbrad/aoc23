import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d9'
import { readInput } from '../utils/fs'

describe('d9:p1', () => {
  it('should solve example case', () => {
    expect(
      part1(`0 3 6 9 12 15
      1 3 6 10 15 21
      10 13 16 21 30 45`),
    ).toEqual(114)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d9.txt')
    expect(part1(input)).toEqual(1731106378)
  })
})

describe('d9:p2', () => {
  it('should solve example case', () => {
    expect(
      part2(`0 3 6 9 12 15
      1 3 6 10 15 21
      10 13 16 21 30 45`),
    ).toEqual(2)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d9.txt')
    expect(part2(input)).toEqual(1087)
  })
})
