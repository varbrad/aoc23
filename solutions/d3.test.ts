import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d3'
import { readInput } from '../utils/fs'

describe('d3:p1', () => {
  it('should solve example case', () => {
    const input = `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`

    expect(part1(input)).toEqual(4361)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d3.txt')
    expect(part1(input)).toEqual(543867)
  })
})

describe('d3:p2', () => {
  it('should solve example case', () => {
    const input = `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`

    expect(part2(input)).toEqual(467835)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d3.txt')
    expect(part2(input)).toEqual(79613331)
  })
})
