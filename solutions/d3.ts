import { isAdjacent } from '../utils/grid'
import { product, sum } from '../utils/maths'

type Position = { x: number; y: number }
type PartNumber = Position & { value: number }
type Sym = Position & { value: string }

const regex = /^(\d+)/
const parse = (input: string) =>
  input
    .split('\n')
    .map((l, y) => {
      const line = l.trim()
      const partNumbers: PartNumber[] = []
      const symbols: Sym[] = []
      for (let x = 0; x < line.length; ++x) {
        const char = line[x]
        if (char === '.') continue
        const match = line.substring(x).match(regex)
        if (match) {
          const value = match[1]
          partNumbers.push({ x, y, value: Number(value) })
          x += value.length - 1
          continue
        } else {
          symbols.push({ x, y, value: char })
        }
      }
      return { partNumbers, symbols }
    })
    .reduce(
      (acc, { partNumbers, symbols }) => {
        return {
          partNumbers: [...acc.partNumbers, ...partNumbers],
          symbols: [...acc.symbols, ...symbols],
        }
      },
      {
        partNumbers: [],
        symbols: [],
      },
    )

export const part1 = (input: string) => {
  const { partNumbers, symbols } = parse(input)

  return sum(
    partNumbers.map((n) =>
      symbols.some((s) =>
        String(n.value)
          .split('')
          .some((_, x) => isAdjacent(s, { x: n.x + x, y: n.y }, true)),
      )
        ? n.value
        : 0,
    ),
  )
}

export const part2 = (input: string) => {
  const { partNumbers, symbols } = parse(input)

  return sum(
    symbols.map((s) => {
      if (s.value !== '*') return 0

      const ns = partNumbers.filter((n) =>
        String(n.value)
          .split('')
          .some((_, x) => isAdjacent(s, { x: n.x + x, y: n.y }, true)),
      )

      if (ns.length !== 2) return 0
      return product(ns.map((n) => n.value))
    }),
  )
}
