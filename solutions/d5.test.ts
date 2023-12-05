import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d5'
import { readInput } from '../utils/fs'

describe('d5:p1', () => {
  it('should solve example case', () => {
    const input = `seeds: 79 14 55 13

    seed-to-soil map:
    50 98 2
    52 50 48

    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15

    fertilizer-to-water map:
    49 53 8
    0 11 42
    42 0 7
    57 7 4

    water-to-light map:
    88 18 7
    18 25 70

    light-to-temperature map:
    45 77 23
    81 45 19
    68 64 13

    temperature-to-humidity map:
    0 69 1
    1 0 69

    humidity-to-location map:
    60 56 37
    56 93 4`

    expect(part1(input)).toEqual(35)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d5.txt')
    expect(part1(input)).toEqual(227653707)
  })
})

describe('d5:p2', () => {
  it('should solve example case', () => {
    const input = `seeds: 79 14 55 13

    seed-to-soil map:
    50 98 2
    52 50 48

    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15

    fertilizer-to-water map:
    49 53 8
    0 11 42
    42 0 7
    57 7 4

    water-to-light map:
    88 18 7
    18 25 70

    light-to-temperature map:
    45 77 23
    81 45 19
    68 64 13

    temperature-to-humidity map:
    0 69 1
    1 0 69

    humidity-to-location map:
    60 56 37
    56 93 4`

    expect(part2(input)).toEqual(46)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d5.txt')
    expect(part2(input)).toEqual(78775051)
  })
})
