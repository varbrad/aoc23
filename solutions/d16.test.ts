import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d16'
import { readInput } from '../utils/fs'

it('test 1', () => {
  expect(part1(`...`)).toEqual(3)
})

describe('d16:p1', () => {
  it('should solve example case', () => {
    expect(
      part1(`.|...\\....
    |.-.\\.....
    .....|-...
    ........|.
    ..........
    .........\\
    ..../.\\\\..
    .-.-/..|..
    .|....-|.\\
    ..//.|....`),
    ).toEqual(46)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d16.txt')
    expect(part1(input)).toEqual(8249)
  })
})

describe('d16:p2', () => {
  it('should solve example case', () => {
    expect(
      part2(`.|...\\....
    |.-.\\.....
    .....|-...
    ........|.
    ..........
    .........\\
    ..../.\\\\..
    .-.-/..|..
    .|....-|.\\
    ..//.|....`),
    ).toEqual(51)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d16.txt')
    expect(part2(input)).toEqual(8444)
  })
})
