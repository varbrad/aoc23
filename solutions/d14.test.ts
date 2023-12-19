import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d14'
import { readInput } from '../utils/fs'

describe('d14:p1', () => {
  it('should solve example case', () => {
    expect(
      part1(`O....#....
      O.OO#....#
      .....##...
      OO.#O....O
      .O.....O#.
      O.#..O.#.#
      ..O..#O..O
      .......O..
      #....###..
      #OO..#....`),
    ).toEqual(136)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d14.txt')
    expect(part1(input)).toEqual(102497)
  })
})

describe('d14:p2', () => {
  it('should solve example case', () => {
    expect(
      part2(`O....#....
      O.OO#....#
      .....##...
      OO.#O....O
      .O.....O#.
      O.#..O.#.#
      ..O..#O..O
      .......O..
      #....###..
      #OO..#....`),
    ).toEqual(64)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d14.txt')
    expect(part2(input)).toEqual(105008)
  })
})
