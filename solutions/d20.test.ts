import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d20'
import { readInput } from '../utils/fs'

describe('d20:p1', () => {
  it('should solve example case #1', () => {
    expect(
      part1(`broadcaster -> a, b, c
      %a -> b
      %b -> c
      %c -> inv
      &inv -> a`),
    ).toEqual(32_000_000)
  })

  it('should solve example case #2', () => {
    expect(
      part1(`broadcaster -> a
      %a -> inv, con
      &inv -> b
      %b -> con
      &con -> output`),
    ).toEqual(11_687_500)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d20.txt')
    expect(part1(input)).toEqual(886347020)
  })
})

describe('d20:p2', () => {
  it('should solve puzzle input', async () => {
    const input = await readInput('d20.txt')
    expect(part2(input)).toEqual(233283622908263)
  })
})
