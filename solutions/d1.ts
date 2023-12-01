import invariant from 'tiny-invariant'
import { sum } from '../utils/maths'

const DIGIT_MAP: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const solve = (input: string, considerStrings: boolean) => {
  const g = considerStrings ? `\\d|${Object.keys(DIGIT_MAP).join('|')}` : `\\d`
  const regex = new RegExp(`(?=(${g})).*(${g})`)

  return sum(
    input
      .trim()
      .split('\n')
      .map((line) => {
        const [, a, b] = line.match(regex) ?? []
        invariant(a && b, `Couldnt find a digit in the line "${line}"`)
        return Number(`${DIGIT_MAP[a] ?? a}${DIGIT_MAP[b] ?? b}`)
      }),
  )
}

export const part1 = (input: string) => solve(input, false)
export const part2 = (input: string) => solve(input, true)
