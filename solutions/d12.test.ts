import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d12'
import { readInput } from '../utils/fs'

describe('d12:p1', () => {
  it('should solve example case', () => {
    expect(
      part1(`???.### 1,1,3
      .??..??...?##. 1,1,3
      ?#?#?#?#?#?#?#? 1,3,1,6
      ????.#...#... 4,1,1
      ????.######..#####. 1,6,5
      ?###???????? 3,2,1`),
    ).toEqual(21)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d12.txt')
    expect(part1(input)).toEqual(7633)
  })
})

describe('d12:p2', () => {
  it('should solve example case', () => {
    expect(
      part2(`???.### 1,1,3
      .??..??...?##. 1,1,3
      ?#?#?#?#?#?#?#? 1,3,1,6
      ????.#...#... 4,1,1
      ????.######..#####. 1,6,5
      ?###???????? 3,2,1`),
    ).toEqual(525152)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d12.txt')
    expect(part2(input)).toEqual(23903579139437)
  })
})
