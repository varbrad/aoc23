import { countBy, sum } from 'lodash'

const CardMap: Record<string, number> = { T: 10, Q: 12, K: 13, A: 14 }

const parseHand = (hand: string, J: number) =>
  hand.split('').map((c) => (c === 'J' ? J : Number(CardMap[c] || c)))

const scoreHand = (hand: number[], includeJokers: boolean): number => {
  const ca = Object.values(countBy(hand.filter((v) => v !== 1)))
  const maxCount =
    Math.max(0, ...ca) +
    (includeJokers ? hand.filter((c) => c === 1).length : 0)

  switch (maxCount) {
    case 5:
      return 7
    case 4:
      return 6
    case 3:
      return ca.length === 2 ? 5 : 4
    case 2:
      return ca.length === 3 ? 3 : 2
    default:
      return 1
  }
}

const solve = (input: string, handleJokers: boolean) =>
  sum(
    input
      .trim()
      .split('\n')
      .map((n) => {
        const [h, b] = n.trim().split(' ')
        const hand = parseHand(h, handleJokers ? 1 : 11)
        return {
          hand,
          score: scoreHand(hand, handleJokers),
          bid: Number(b),
        }
      })
      .sort((a, b) => {
        const diff = b.score - a.score
        if (diff !== 0) return diff
        for (let i = 0; i < a.hand.length; i++) {
          const diff = b.hand[i] - a.hand[i]
          if (diff !== 0) return diff
        }
        return 0
      })
      .map((h, i, arr) => h.bid * (arr.length - i)),
  )

export const part1 = (input: string) => solve(input, false)
export const part2 = (input: string) => solve(input, true)
