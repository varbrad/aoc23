import _ from 'lodash/fp'
import { product } from '../utils/maths'

type Input = [number, number]

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
const solve = ([t, d]: Input) =>
  t - Math.ceil((t - Math.sqrt(t ** 2 - 4 * (d + 1))) / 2) * 2 + 1

// Time:        47     98     66     98
// Distance:   400   1213   1011   1540
const regex = /(\d+)/g
const parse = <T>(input: string, fn: (s: string[]) => T) =>
  _.pipe(
    _.trim,
    _.split('\n'),
    _.map((s) => fn(s.match(regex)!)),
  )(input)

const parseP1 = (input: string): Input[] => {
  const ns = parse(input, (s) => s.map(Number))
  return _.zip(ns[0], ns[1]) as Input[]
}
const parseP2 = (input: string): Input => {
  const n = parse(input, (s) => Number(s.join('')))
  return [n[0], n[1]]
}

export const part1 = (input: string) => product(parseP1(input).map(solve))
export const part2 = (input: string) => solve(parseP2(input))
