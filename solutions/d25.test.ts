import { describe, expect, it } from 'bun:test'
import { part1 } from './d25'
import { readInput } from '../utils/fs'

describe('d25:p1', () => {
  it('should pass the puzzle input', async () => {
    const input = await readInput('d25.txt')
    expect(part1(input)).toEqual(613_870)
  })
})
