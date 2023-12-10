import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d10'
import { readInput } from '../utils/fs'

describe('d10:p1', () => {
  it('should solve example case #1', () => {
    expect(
      part1(`.....
      .S-7.
      .|.|.
      .L-J.
      .....`),
    ).toEqual(4)
  })

  it('should solve example case #2', () => {
    expect(
      part1(`..F7.
      .FJ|.
      SJ.L7
      |F--J
      LJ...`),
    ).toEqual(8)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d10.txt')
    expect(part1(input)).toEqual(7030)
  })
})

describe('d10:p2', () => {
  it('should solve example case #1', () => {
    expect(
      part2(`.....
    .S-7.
    .|.|.
    .L-J.
    .....`),
    ).toEqual(1)
  })

  it('should solve example case #2', () => {
    expect(
      part2(`...........
    .S-------7.
    .|F-----7|.
    .||.....||.
    .||.....||.
    .|L-7.F-J|.
    .|..|.|..|.
    .L--J.L--J.
    ...........`),
    ).toEqual(4)
  })

  it('should solve example case #3', () => {
    expect(
      part2(`..........
    .S------7.
    .|F----7|.
    .||OOOO||.
    .||OOOO||.
    .|L-7F-J|.
    .|II||II|.
    .L--JL--J.
    ..........`),
    ).toEqual(4)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d10.txt')
    expect(part2(input)).toEqual(285)
  })
})
