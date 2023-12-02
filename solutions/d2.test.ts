import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d2'
import { readInput } from '../utils/fs'

describe('d2:p1', () => {
  it('should solve example case', () => {
    const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

    expect(part1(input)).toEqual(8)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d2.txt')
    expect(part1(input)).toEqual(2416)
  })
})

describe('d2:p1', () => {
  it('should solve example case', () => {
    const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

    expect(part2(input)).toEqual(2286)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d2.txt')
    expect(part2(input)).toEqual(63307)
  })
})
