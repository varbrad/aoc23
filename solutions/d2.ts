import invariant from 'tiny-invariant'
import { product, sum } from '../utils/maths'

const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((row) => {
      const split = row.trim().match(/^Game (\d+): (.*)$/)
      invariant(split)

      const gameN = Number(split[1])
      const picks = Array.from(split[2].matchAll(/(\d+) (\w+)/g)).map((p) => ({
        n: Number(p[1]),
        c: ['r', 'g', 'b'].indexOf(p[2][0]),
      }))

      return {
        id: gameN,
        picks,
      }
    })

export const part1 = (input: string) =>
  sum(
    parse(input).map((game) =>
      game.picks.some((p) => p.n > 12 + p.c) ? 0 : game.id,
    ),
  )

export const part2 = (input: string) =>
  sum(
    parse(input).map((game) =>
      product(
        game.picks.reduce(
          (acc, p) => {
            const next = [...acc]
            next[p.c] = Math.max(p.n, acc[p.c])
            return next
          },
          [0, 0, 0],
        ),
      ),
    ),
  )
