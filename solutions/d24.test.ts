import { describe, expect, it } from 'bun:test'
import { part1 } from './d24'
import { readInput } from '../utils/fs'

describe('d24:p1', () => {
  it('should pass the example', () => {
    const input = `19, 13, 30 @ -2,  1, -2
    18, 19, 22 @ -1, -1, -2
    20, 25, 34 @ -2, -2, -4
    12, 31, 28 @ -1, -2, -1
    20, 19, 15 @  1, -5, -3`

    expect(part1(input, [7, 27])).toEqual(2)
  })

  it('should pass the puzzle input', async () => {
    const input = await readInput('d24.txt')
    expect(part1(input)).toEqual(16779)
  })
})
