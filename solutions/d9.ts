import _ from 'lodash/fp'

const solve = (ns: number[]): number =>
  ns.every(_.equals(0))
    ? 0
    : _.last(ns)! + solve(ns.slice(1).map((n, i) => n - ns[i]))

const parse = (input: string, reverse = false) =>
  input
    .trim()
    .split('\n')
    .map(
      _.pipe(
        _.trim,
        _.split(' '),
        _.map(Number),
        reverse ? _.reverse : (n) => n,
      ),
    )

export const part1 = (input: string) => _.sum(parse(input).map(solve))
export const part2 = (input: string) => _.sum(parse(input, true).map(solve))
