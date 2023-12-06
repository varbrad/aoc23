import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d6'

describe('d6:p1', () => {
  it('should solve example case', () => {
    expect(
      part1([
        { t: 7, d: 9 },
        { t: 15, d: 40 },
        { t: 30, d: 200 },
      ]),
    ).toEqual(288)
  })

  it('should solve puzzle input', async () => {
    expect(
      part1([
        { t: 47, d: 400 },
        { t: 98, d: 1213 },
        { t: 66, d: 1011 },
        { t: 98, d: 1540 },
      ]),
    ).toEqual(1660968)
  })
})

describe('d6:p2', () => {
  it('should solve example case', () => {
    expect(part2({ t: 71530, d: 940200 })).toEqual(71503)
  })

  it('should solve puzzle input', async () => {
    expect(part2({ t: 47986698, d: 400121310111540 })).toEqual(26499773)
  })
})
