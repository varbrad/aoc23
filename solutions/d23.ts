import { isDefined } from '../utils/types'

type XY = { x: number; y: number }
type XYT = XY & { t: '.' | '>' | '<' | '^' | 'v' | '#' }

const parseP1 = (input: string) => {
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

  return makeGraph(start, end, map)
}

const getKey = (x: number, y: number) => `${x},${y}`
const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]

type Ret = { from: XY; steps: number; to: Ret[] | 'END' }
const makeGraph = (start: XY, end: XY, map: Map<string, XYT['t']>): Ret[] => {
  const node: XY = { x: start.x, y: start.y }
  let steps = 0
  // eslint-disable-next-line no-constant-condition
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
        if (item === '<' && dx === 1) return
        if (item === '>' && dx === -1) return
        if (item === '^' && dy === 1) return
        if (item === 'v' && dy === -1) return
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
        to: makeGraph(wtf, end, structuredClone(map)),
      }))
    }
  }
}

const constructSteps = (r: Ret[]): number[] =>
  r.flatMap((r) => {
    if (r.to === 'END') return [r.steps]
    return r.to.flatMap((t) => constructSteps([t]).map((p) => p + r.steps))
  })

const parse = (input: string) => {
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

  const w = lines[0].length
  const h = lines.length

  const junctions = []
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map.get(getKey(x, y)) !== '.') continue
      const up = map.get(getKey(x, y - 1)) === '.'
      const down = map.get(getKey(x, y + 1)) === '.'
      const left = map.get(getKey(x - 1, y)) === '.'
      const right = map.get(getKey(x + 1, y)) === '.'
      const count = [up, down, left, right].filter((i) => i).length
      if (count > 2) junctions.push({ x, y })
    }
  }

  return { map, start, end, w, h, junctions }
}

const findPath = (node: XY, map: Map<string, XYT['t']>, targets: XY[]) => {
  const openList = [{ node, steps: 0 }]
  const closedList = new Set<string>()
  const canSee: { node: XY; steps: number }[] = []

  while (openList.length > 0) {
    const { node, steps } = openList.shift()!
    closedList.add(getKey(node.x, node.y))
    const neighbours = [
      { x: node.x, y: node.y - 1 },
      { x: node.x, y: node.y + 1 },
      { x: node.x - 1, y: node.y },
      { x: node.x + 1, y: node.y },
    ].filter((n) => map.get(getKey(n.x, n.y)) === '.')
    for (const neighbour of neighbours) {
      if (closedList.has(getKey(neighbour.x, neighbour.y))) continue
      if (targets.some((t) => t.x === neighbour.x && t.y === neighbour.y)) {
        canSee.push({ node: neighbour, steps: steps + 1 })
        continue
      }
      openList.push({ node: neighbour, steps: steps + 1 })
    }
  }
  return canSee
}

export const part1 = (input: string): number => {
  const parsed = parseP1(input)
  const rs = constructSteps(parsed)
  return Math.max(...rs)
}

export const part2 = (input: string): number => {
  const { start, end, map, junctions } = parse(input.replace(/[<>^v]/g, '.'))
  const all = [start, ...junctions, end]

  const nodes = all.map((n) => ({
    x: n.x,
    y: n.y,
    neighbours: findPath(n, map, all),
  }))

  const consider: { path: XY[]; steps: number }[] = [
    { path: [start], steps: 0 },
  ]

  const finalPaths: number[] = []
  while (consider.length) {
    const { path, steps } = consider.pop()!
    const last = path[path.length - 1]
    const fromLast = nodes.find((n) => n.x === last.x && n.y === last.y)
    if (!fromLast) continue
    for (const neighbour of fromLast.neighbours) {
      if (
        path.some((p) => p.x === neighbour.node.x && p.y === neighbour.node.y)
      )
        continue
      if (neighbour.node.x === end.x && neighbour.node.y === end.y) {
        finalPaths.push(steps + neighbour.steps)
        continue
      }
      consider.push({
        path: [...path, neighbour.node],
        steps: steps + neighbour.steps,
      })
    }
  }

  let max = finalPaths[0]
  for (const p of finalPaths) {
    if (p > max) max = p
  }
  return max
}
