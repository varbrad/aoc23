import { sum } from 'lodash/fp'
import { loopSum } from '../utils/loop'

const hash = (str: string) =>
  str.split('').reduce((a, b) => ((a + b.charCodeAt(0)) * 17) % 256, 0)

export const part1 = (input: string) => sum(input.trim().split(',').map(hash))

const regex = /(\w+)([=-])(\d+)?/
export const part2 = (input: string) =>
  loopSum(
    ([boxN, lenses]) =>
      loopSum((l, ix) => (boxN + 1) * (ix + 1) * l[1], lenses),
    Array.from(
      input
        .trim()
        .split(',')
        .map((item) => {
          const [label, type, fl] = item.match(regex)!.slice(1) as [
            string,
            '=' | '-',
            string | undefined,
          ]
          return type === '='
            ? { label, type, fl: Number(fl), hash: hash(label) }
            : { label, type, hash: hash(label) }
        })
        .reduce((boxes, i) => {
          switch (i.type) {
            case '-': {
              const boxContents = boxes.get(i.hash)
              if (!boxContents) break
              const idx = boxContents.findIndex(([l]) => l === i.label)
              idx > -1 && boxContents.splice(idx, 1)
              break
            }
            case '=': {
              const boxContents = boxes.get(i.hash) || []
              const existing = boxContents.find(([l]) => l === i.label)
              if (existing) {
                existing[1] = i.fl
                break
              }
              boxContents.push([i.label, i.fl])
              boxes.set(i.hash, boxContents)
              break
            }
          }
          return boxes
        }, new Map<number, [label: string, fl: number][]>())
        .entries(),
    ),
  )
