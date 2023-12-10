import _ from 'lodash/fp'
import { douglasPeucker, isInside } from '../utils/polygons'

const parse = _.pipe(_.trim, _.split('\n'), _.map(_.pipe(_.trim, _.split(''))))

const toGrid = (list: string[][]) => {
  const map = new Map<string, string>()
  list.forEach((row, y) => {
    row.forEach((col, x) => {
      map.set(`${x},${y}`, col)
    })
  })
  return map
}

const findStart = (grid: Map<string, string>): XY => {
  for (const [xy, value] of grid.entries()) {
    if (value === 'S') return xy.split(',').map(Number) as [number, number]
  }
  throw new Error('No start found')
}

const UP: XY = [0, -1]
const DOWN: XY = [0, 1]
const LEFT: XY = [-1, 0]
const RIGHT: XY = [1, 0]

const cardinals: XY[] = [UP, DOWN, LEFT, RIGHT]

const dirs: Record<string, XY[] | undefined> = {
  '|': [UP, DOWN],
  '-': [LEFT, RIGHT],
  J: [UP, LEFT],
  L: [UP, RIGHT],
  '7': [DOWN, LEFT],
  F: [DOWN, RIGHT],
}

type XY = [number, number]

export const getPath = (input: string) => {
  const list = parse(input)
  const grid = toGrid(list)
  const start = findStart(grid)

  const startingPoints = cardinals
    .map<XY>(([dx, dy]) => [start[0] + dx, start[1] + dy])
    .filter(([x, y]) => (grid.get(`${x},${y}`) || '.') !== '.')

  for (let i = 0; i < startingPoints.length; ++i) {
    const sp = startingPoints[i]
    const visited = new Set<string>([start.join(',')])
    const path = [start, sp]

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const [x, y] = _.last(path)!
      const key = `${x},${y}`
      const next = grid.get(key)
      if (next === 'S') return path.slice(0, -1)
      if (!next) break
      const nextDirs = dirs[next]
      if (!nextDirs) break
      visited.add(key)
      const nextDir = nextDirs.find(([dx, dy]) => {
        const [nx, ny] = [x + dx, y + dy]
        const nextKey = `${nx},${ny}`
        return (
          (path.length > 3 && grid.get(nextKey) === 'S') ||
          !visited.has(nextKey)
        )
      })
      if (!nextDir) break
      const nx = x + nextDir[0]
      const ny = y + nextDir[1]
      path.push([nx, ny])
    }
  }

  return null
}

export const part1 = (input: string) => getPath(input)!.length / 2

export const part2 = (input: string) => {
  const path = getPath(input)!
  const optimalPolygon = douglasPeucker(path, 0)

  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity]
  path.forEach(([x, y]) => {
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  })

  const walls = new Set<string>()
  path.forEach(([x, y]) => walls.add(`${x},${y}`))

  let sum = 0
  for (let y = minY + 1; y < maxY; ++y) {
    for (let x = minX + 1; x < maxX; ++x) {
      // Ignore points on the edge, as these are walls (and not "inside")
      if (walls.has(`${x},${y}`)) continue
      if (isInside(optimalPolygon, x, y)) sum++
    }
  }

  return sum
}
