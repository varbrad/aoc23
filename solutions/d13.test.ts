import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d13'
import { readInput } from '../utils/fs'

describe('d13:p1', () => {
  it('should solve example case #1', () => {
    expect(
      part1(`#.##..##.
      ..#.##.#.
      ##......#
      ##......#
      ..#.##.#.
      ..##..##.
      #.#.##.#.

      #...##..#
      #....#..#
      ..##..###
      #####.##.
      #####.##.
      ..##..###
      #....#..#`),
    ).toEqual(405)
  })

  it('should solve example case #2', () => {
    expect(
      part1(`.##.#..
    .##.#..
    #..#.##
    .#...##
    ##.#..#
    #..##.#
    #..##.#
    ##.#..#
    .##..##`),
    ).toEqual(100)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d13.txt')
    expect(part1(input)).toEqual(29165)
  })
})

describe('d13:p2', () => {
  it('should solve example case #1', () => {
    expect(
      part2(`#.##..##.
      ..#.##.#.
      ##......#
      ##......#
      ..#.##.#.
      ..##..##.
      #.#.##.#.

      #...##..#
      #....#..#
      ..##..###
      #####.##.
      #####.##.
      ..##..###
      #....#..#`),
    ).toEqual(400)
  })

  it('should solve example case #2', () => {
    expect(
      part2(`.##.#..
    .##.#..
    #..#.##
    .#...##
    ##.#..#
    #..##.#
    #..##.#
    ##.#..#
    .##..##`),
    ).toEqual(600)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d13.txt')
    expect(part2(input)).toEqual(32192)
  })
})
