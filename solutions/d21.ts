import { isDefined } from '../utils/types'

type XY = { x: number; y: number }
const parse = (input: string) => {
  const items = input
    .trim()
    .split('\n')
    .flatMap((l, y) =>
      l
        .trim()
        .split('')
        .map<(XY & { type: '#' | 'S' }) | null>((type, x) =>
          type === '#' || type === 'S' ? { x, y, type } : null,
        ),
    )
    .filter(isDefined)

  const walls = new Set<string>()
  items.forEach((i) => i.type === '#' && walls.add(`${i.x},${i.y}`))
  const start = items.find((i) => i.type === 'S')!

  return {
    walls,
    start,
  }
}

function floodFill(
  { walls, start }: ReturnType<typeof parse>,
  maxSteps: number,
): XY[] {
  const visited = new Set<string>()
  const result = new Set<string>()
  const queue: [XY, number][] = [[start, 0]]

  while (queue.length > 0) {
    const [xy, distance] = queue.shift()!
    const { x, y } = xy

    const pointKey = `${x},${y}`
    if (visited.has(pointKey) || distance > maxSteps) continue

    visited.add(pointKey)
    result.add(pointKey)

    const neighbors: XY[] = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ]

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x},${neighbor.y}`
      if (!visited.has(neighborKey) && !walls.has(neighborKey)) {
        queue.push([neighbor, distance + 1])
      }
    }
  }

  return Array.from(result).map((pointKey) => {
    const [x, y] = pointKey.split(',').map(Number)
    return { x, y }
  })
}

export const part1 = (input: string, maxSteps = 64) =>
  floodFill(parse(input), maxSteps).filter(
    (c) => (Math.abs(c.x) + Math.abs(c.y)) % 2 === maxSteps % 2,
  ).length
