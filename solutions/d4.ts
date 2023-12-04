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

  const cardMap = new Map<number, number>()
  const ids = cards.map((c) => c.id)

  while (ids.length > 0) {
    const next = ids.shift()!
    cardMap.set(next, (cardMap.get(next) ?? 0) + 1)
    const card = cards.find((c) => c.id === next)!
    ids.push(...card.winners)
  }

  return sum(Array.from(cardMap.values()))
}
