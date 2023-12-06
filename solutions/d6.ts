import { product } from '../utils/maths'

type Input = { t: number; d: number }

/**
 * The distance covered forms a quadratic curve of the type `dis = tx - x^2`
 * Therefore, to find the earliest such point where `dis > d`, we subtract
 * `d` and end up with an equation like so;
 * `0 = tx - x^2 - d`
 *
 * We then simply need the lowest root of this quadratic equation, which
 * we use the standard formula for (with some optimisations as `a` is
 * always `1` in this case).
 *
 * We then round up to the nearest number, and subtract 2 times this (as the
 * curve is symmetrical) and add 1 (as we want the range inclusive).
 */
const solve = ({ t, d }: Input) =>
  t - Math.ceil((t - Math.sqrt(t ** 2 - 4 * (d + 1))) / 2) * 2 + 1

export const part1 = (input: Input[]) => product(input.map(solve))
export const part2 = (input: Input) => solve(input)
