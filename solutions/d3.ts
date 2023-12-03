import { partition } from 'lodash/fp'
import { isAdjacent } from '../utils/grid'
import { product, sum } from '../utils/maths'
import { execAll } from '../utils/regex'

type Position = { x: number; y: number }
type PartNumber = Position & { type: 'pn'; value: number }
type Sym = Position & { type: 'sym'; value: string }

const isPN = (i: PartNumber | Sym): i is PartNumber => i.type === 'pn'

const regex = /(\d+|[^.]{1})/g
const parse = (input: string) =>
  partition(
    isPN,
    input
      .split('\n')
      .flatMap((l, y) =>
        execAll(regex, l.trim()).map<PartNumber | Sym>((r) =>
          Number.isInteger(Number(r[1]))
            ? { type: 'pn', value: Number(r[1]), x: r.index, y }
            : { type: 'sym', value: r[1], x: r.index, y },
        ),
      ),
  )

export const part1 = (input: string) => {
  const [pns, syms] = parse(input)

  return sum(
    pns.map((n) =>
      syms.some((s) =>
        String(n.value)
          .split('')
          .some((_, x) => isAdjacent(s, { x: n.x + x, y: n.y })),
      )
        ? n.value
        : 0,
    ),
  )
}

export const part2 = (input: string) => {
  const [pns, syms] = parse(input)

  return sum(
    syms.map((s) => {
      if (s.value !== '*') return 0

      const ns = pns.filter((n) =>
        String(n.value)
          .split('')
          .some((_, x) => isAdjacent(s, { x: n.x + x, y: n.y })),
      )

      return ns.length === 2 ? product(ns.map((n) => n.value)) : 0
    }),
  )
}
