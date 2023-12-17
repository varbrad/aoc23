import Heap from 'heap-js'

type Move = {
  x: number
  y: number
  dir: number // 0 = Up, 1 = Right, 2 = Down, 3 = Left
  g: number
  h: number
  steps: number
}

const getNextMoves = (
  x: number,
  y: number,
  dir: number,
): Pick<Move, 'x' | 'y' | 'dir'>[] => {
  const moves: Pick<Move, 'x' | 'y' | 'dir'>[] = []
  for (let i = 0; i < 4; ++i) {
    const newDir = (dir + i) % 4
    if (i === 2) continue
    const nx = x + (newDir === 1 ? 1 : newDir === 3 ? -1 : 0)
    const ny = y + (newDir === 0 ? -1 : newDir === 2 ? 1 : 0)
    moves.push({ x: nx, y: ny, dir: newDir })
  }
  return moves
}

const fingerprint = ({ x, y, dir, steps }: Move): number =>
  (x << 24) | (y << 16) | (dir << 8) | steps

const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((l) => l.trim().split('').map(Number))

const solve = (input: string, maxSteps: number, minSteps = 1) => {
  const grid = parse(input)
  const end = { x: grid[0].length - 1, y: grid.length - 1 }

  // Min-heap sorted based on minimum `f` cost (g + h)
  const queue = new Heap<Move>((a, b) => a.g + a.h - (b.g + b.h))
  const cache = new Set<number>()

  const east: Move = { x: 0, y: 0, dir: 1, g: 0, h: 0, steps: 0 }
  const south: Move = { x: 0, y: 0, dir: 2, g: 0, h: 0, steps: 0 }

  queue.push(east, south)
  cache.add(fingerprint(east)).add(fingerprint(south))

  while (queue.size()) {
    const { x, y, dir, g, steps } = queue.pop()!

    if (x === end.x && y === end.y) {
      // If we have to take a minimum number of steps, then we can't stop
      if (steps < minSteps) continue
      return g
    }

    const validMoves = getNextMoves(x, y, dir).filter(
      ({ x, y, dir: newDir }) => {
        // Can't be a valid move if it is outside of the bounds
        if (x < 0 || x > end.x || y < 0 || y > end.y) return false
        if (steps < minSteps) return newDir === dir
        if (steps > maxSteps - 1) return newDir !== dir
        return true
      },
    )

    for (const { x: nx, y: ny, dir: ndir } of validMoves) {
      const move: Move = {
        x: nx,
        y: ny,
        dir: ndir,
        g: g + grid[ny][nx],
        h: end.x - nx + end.y - ny,
        steps: ndir === dir ? steps + 1 : 1,
      }

      const key = fingerprint(move)
      // Don't bother investigating paths we have already taken before
      if (!cache.has(key)) {
        cache.add(key)
        queue.push(move)
      }
    }
  }

  return -1
}

export const part1 = (input: string) => solve(input, 3)
export const part2 = (input: string) => solve(input, 10, 4)
