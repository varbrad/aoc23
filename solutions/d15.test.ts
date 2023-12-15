import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d15'
import { readInput } from '../utils/fs'

describe('d15:p1', () => {
  it('should solve example case #1', () => {
    expect(part1(`HASH`)).toEqual(52)
  })

  it('should solve example case #2', () => {
    expect(
      part1(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`),
    ).toEqual(1320)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d15.txt')
    expect(part1(input)).toEqual(511498)
  })
})

describe('d15:p2', () => {
  it('should solve example case', () => {
    expect(
      part2(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`),
    ).toEqual(145)
  })

  it('should solve puzzle input', async () => {
    const input = await readInput('d15.txt')
    expect(part2(input)).toEqual(284674)
  })
})
