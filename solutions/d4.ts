import { intersection, sum } from 'lodash'

export const part1 = (input: string) =>
  sum(
    input
      .split('\n')
      .map((l) =>
        l
          .trim()
          .match(/^Card\s+(\d+): ([\d\s]*)\|([\d\s]*)$/)!
          .slice(1)
          .map((l) => l.trim().replaceAll(/\s+/g, ' ').split(' ').map(Number)),
      )
      .map(([, a, b]) => intersection(a, b).length)
      .map((l) => (l === 0 ? 0 : 1 << (l - 1))),
  )

export const part2 = (input: string) => {
  const cards = input
    .split('\n')
    .map((l) =>
      l
        .trim()
        .match(/^Card\s+(\d+): ([\d\s]*)\|([\d\s]*)$/)!
        .slice(1)
        .map((l) => l.trim().replaceAll(/\s+/g, ' ').split(' ').map(Number)),
    )
    .map(([[id], a, b]) => ({
      id,
      winners: intersection(a, b).map((_, i) => id + i + 1),
    }))

  const cardMap = new Map<number, number[]>()
  const scoreMap = new Map<number, number>()
  cards.forEach(({ id, winners }) => cardMap.set(id, winners))

  const calcScore = (id: number): number =>
    1 + sum(cardMap.get(id)!.map(calcScore))

  return sum(
    cards.map(({ id }) => {
      if (!scoreMap.has(id)) scoreMap.set(id, calcScore(id))
      return scoreMap.get(id)!
    }),
  )
}
