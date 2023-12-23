import { isDefined } from '../utils/types'

type XY = { x: number; y: number }
type XYT = XY & { t: '.' | '>' | '<' | '^' | 'v' | '#' }

const parse = (input: string, ignoreSlopes = false) => {
  const lines = input.trim().split('\n')
  const nodeList = lines
    .flatMap((l, y) =>
      l
        .trim()
        .split('')
        .map<XYT>((c, x) => ({ x, y, t: c as XYT['t'] })),
    )
    .filter(isDefined)

  const map = new Map<string, XYT['t']>()
  nodeList.forEach((n) => map.set(`${n.x},${n.y}`, n.t))

  const start = nodeList.find((i) => i.t === '.' && i.y === 0)!
  const end = nodeList.find((i) => i.t === '.' && i.y === lines.length - 1)!

  return makeGraph(start, end, map, ignoreSlopes)
}

const getKey = (x: number, y: number) => `${x},${y}`
const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]

type Ret = { from: XY; steps: number; to: Ret[] | 'END' }
const makeGraph = (
  start: XY,
  end: XY,
  map: Map<string, XYT['t']>,
  ignoreSlopes: boolean,
): Ret[] => {
  const node: XY = { x: start.x, y: start.y }
  let steps = 0
  while (true) {
    if (node.x === end.x && node.y === end.y)
      return [{ from: start, steps, to: 'END' }]
    map.delete(getKey(node.x, node.y))
    const waysToGo = dirs
      .map(([dx, dy]) => {
        const nx = node.x + dx
        const ny = node.y + dy
        const key = getKey(nx, ny)
        const item = map.get(key)
        if (item === undefined || item === '#') return
        if (!ignoreSlopes) {
          if (item === '<' && dx === 1) return
          if (item === '>' && dx === -1) return
          if (item === '^' && dy === 1) return
          if (item === 'v' && dy === -1) return
        }
        return { x: nx, y: ny }
      })
      .filter(isDefined)

    if (waysToGo.length === 0) return []
    steps++
    if (waysToGo.length === 1) {
      node.x = waysToGo[0]!.x
      node.y = waysToGo[0]!.y
      continue
    }
    if (waysToGo.length > 1) {
      return waysToGo.map((wtf) => ({
        from: start,
        steps,
        to: makeGraph(wtf, end, structuredClone(map), ignoreSlopes),
      }))
    }
  }
}

const constructSteps = (r: Ret[]): number[] =>
  r.flatMap((r) => {
    if (r.to === 'END') return [r.steps]
    return r.to.flatMap((t) => constructSteps([t]).map((p) => p + r.steps))
  })

export const part1 = (input: string): number => {
  const parsed = parse(input)
  const rs = constructSteps(parsed)
  return Math.max(...rs)
}

export const part2 = (input: string): number => {
  const parsed = parse(input, true)
  console.log('parsed')
  const rs = constructSteps(parsed)
  return Math.max(...rs)
}
