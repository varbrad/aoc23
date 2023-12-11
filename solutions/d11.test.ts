import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d11'
import { readInput } from '../utils/fs'

describe('d11:p1', () => {
  it('should solve example case', () => {
    expect(
      part1(`...#......
      .......#..
      #.........
      ..........
      ......#...
      .#........
      .........#
      ..........
      .......#..
      #...#.....`),
    ).toEqual(374)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d11.txt')
    expect(part1(input)).toEqual(9684228)
  })
})

describe('d11:p2', () => {
  it('should solve example case', () => {
    expect(
      part2(`...#......
      .......#..
      #.........
      ..........
      ......#...
      .#........
      .........#
      ..........
      .......#..
      #...#.....`),
    ).toEqual(82000210)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d11.txt')
    expect(part2(input)).toEqual(483844716556)
  })
})
