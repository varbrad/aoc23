import { intersection, sum } from 'lodash'
import { loopSum } from '../utils/loop'

const parse = (input: string) =>
  input
    .split('\n')
    .map((l) =>
      l
        .trim()
        .match(/^Card\s+(\d+): ([\d\s]*)\|([\d\s]*)$/)!
        .slice(1)
        .map((l) => l.trim().replaceAll(/\s+/g, ' ').split(' ').map(Number)),
    )
    .map(([[id], a, b]) => ({ id, winners: intersection(a, b) }))

export const part1 = (input: string) =>
  sum(
    parse(input).map(({ winners }) =>
      winners.length === 0 ? 0 : 1 << (winners.length - 1),
    ),
  )

export const part2 = (input: string) => {
  const cards = new Map<number, number[]>(
    parse(input).map(
      (o) => [o.id, o.winners.map((_, i) => o.id + i + 1)] as const,
    ),
  )

  const calcScore = (id: number): number =>
    1 + loopSum(calcScore, cards.get(id)!)
  return loopSum(calcScore, Array.from(cards.keys()))
}
