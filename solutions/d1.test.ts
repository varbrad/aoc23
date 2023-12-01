import { describe, expect, it } from "bun:test";
import { part1, part2 } from "./d1";
import { readInput } from "../utils/fs";

describe('d1:p1', () => {
  it('should pass the example', () => {
    const input = `1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`

    expect(part1(input)).toEqual(142)
  })

  it('should pass the puzzle input', async () => {
    const input = await readInput('d1.txt')
    expect(part1(input)).toEqual(54990)
  })
})

describe('d1:p2', () => {
  it('should pass the example', () => {
    const input = `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`
    
    expect(part2(input)).toEqual(281)
  })

  it('should pass the puzzle input', async () => {
    const input = await readInput('d1.txt')
    expect(part2(input)).toEqual(54473)
  })
})
