import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d7'
import { readInput } from '../utils/fs'

describe('d7:p1', () => {
  it('should solve example case', () => {
    expect(
      part1(
        `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
      ),
    ).toEqual(6440)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d7.txt')
    expect(part1(input)).toEqual(249204891)
  })
})

describe('d7:p2', () => {
  it('should solve example case', () => {
    expect(
      part2(
        `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
      ),
    ).toEqual(5905)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d7.txt')
    expect(part2(input)).toEqual(249666369)
  })
})
