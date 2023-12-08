import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d8'
import { readInput } from '../utils/fs'

describe('d8:p1', () => {
  it('should solve example case #1', () => {
    expect(
      part1(`RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)`),
    ).toEqual(2)
  })

  it('should solve example case #2', () => {
    expect(
      part1(`LLR

      AAA = (BBB, BBB)
      BBB = (AAA, ZZZ)
      ZZZ = (ZZZ, ZZZ)`),
    ).toEqual(6)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d8.txt')
    expect(part1(input)).toEqual(18023)
  })
})

describe('d8:p2', () => {
  it('should solve example case', () => {
    expect(
      part2(`LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`),
    ).toEqual(6)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d8.txt')
    expect(part2(input)).toEqual(14449445933179)
  })
})
