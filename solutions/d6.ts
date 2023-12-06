import { product } from '../utils/maths'

type Input = { t: number; d: number }

const solve = ({ t, d }: Input) =>
  t - Math.ceil((t - Math.sqrt(t ** 2 - 4 * (d + 1))) / 2) * 2 + 1

export const part1 = (input: Input[]) => product(input.map(solve))
export const part2 = (input: Input) => solve(input)
