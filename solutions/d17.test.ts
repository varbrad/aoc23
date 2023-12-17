import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d17'
import { readInput } from '../utils/fs'

describe('d17:p1', () => {
  it('should solve example case #1', () => {
    expect(
      part1(`11111
             19991
             19991
             19991
             11111`),
    ).toEqual(16)
  })

  it('should solve example case #3', () => {
    expect(
      part1(`191119111
             191919191
             111911191`),
    ).toEqual(18)
  })

  it('should solve example case #3', () => {
    expect(
      part1(`2413432311323
      3215453535623
      3255245654254
      3446585845452
      4546657867536
      1438598798454
      4457876987766
      3637877979653
      4654967986887
      4564679986453
      1224686865563
      2546548887735
      4322674655533`),
    ).toEqual(102)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d17.txt')
    expect(part1(input)).toEqual(674)
  })
})

describe('d17:p2', () => {
  it('should solve example case #1', () => {
    expect(
      part2(`2413432311323
      3215453535623
      3255245654254
      3446585845452
      4546657867536
      1438598798454
      4457876987766
      3637877979653
      4654967986887
      4564679986453
      1224686865563
      2546548887735
      4322674655533`),
    ).toEqual(94)
  })

  it('should solve example case #2', () => {
    expect(
      part2(`111111111111
    999999999991
    999999999991
    999999999991
    999999999991`),
    ).toEqual(71)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d17.txt')
    expect(part2(input)).toEqual(773)
  })
})
