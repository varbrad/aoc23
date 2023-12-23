import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d22'
import { readInput } from '../utils/fs'

describe('d22:p1', () => {
  it('should pass the example', () => {
    const input = `1,0,1~1,2,1
    0,0,2~2,0,2
    0,2,3~2,2,3
    0,0,4~0,2,4
    2,0,5~2,2,5
    0,1,6~2,1,6
    1,1,8~1,1,9`

    expect(part1(input)).toEqual(5)
  })

  it('should pass the puzzle input', async () => {
    const input = await readInput('d22.txt')
    expect(part1(input)).toEqual(393)
  })
})

describe('d22:p2', () => {
  it('should pass the example', () => {
    const input = `1,0,1~1,2,1
    0,0,2~2,0,2
    0,2,3~2,2,3
    0,0,4~0,2,4
    2,0,5~2,2,5
    0,1,6~2,1,6
    1,1,8~1,1,9`

    expect(part2(input)).toEqual(7)
  })

  it('should pass the puzzle input', async () => {
    const input = await readInput('d22.txt')
    expect(part2(input)).toEqual(58440)
  })
})
