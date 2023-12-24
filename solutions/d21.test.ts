import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d21'
import { readInput } from '../utils/fs'

const example = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`

describe('d21:p1', () => {
  it.each([
    { steps: 0, expected: 1 },
    { steps: 1, expected: 2 },
    { steps: 2, expected: 4 },
    { steps: 6, expected: 16 },
  ])('should solve the example case', ({ steps, expected }) => {
    expect(part1(example, steps)).toEqual(expected)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d21.txt')
    expect(part1(input)).toEqual(3795)
  })
})

describe('d21:p2', () => {
  it('should solve puzzle input', async () => {
    const input = await readInput('d21.txt')
    expect(part2(input)).toEqual(630129824772393)
  })
})
