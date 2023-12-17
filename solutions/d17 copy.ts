import Heap from 'heap-js'

enum Direction {
  N = 1,
  S = 2,
  E = 3,
  W = 4,
}

type Position = [number, number, Direction]
type HeatLoss = number
type StepsInDirection = number
type Heuristic = number
type Step = [Heuristic, Position, HeatLoss, StepsInDirection]

const getNextPositions: Record<
  Direction,
  (x: number, y: number) => Position[]
> = {
  [Direction.N]: (x, y) => [
    [x, y - 1, Direction.N],
    [x + 1, y, Direction.E],
    [x - 1, y, Direction.W],
  ],
  [Direction.S]: (x, y) => [
    [x, y + 1, Direction.S],
    [x + 1, y, Direction.E],
    [x - 1, y, Direction.W],
  ],
  [Direction.E]: (x, y) => [
    [x, y + 1, Direction.S],
    [x, y - 1, Direction.N],
    [x + 1, y, Direction.E],
  ],
  [Direction.W]: (x, y) => [
    [x, y + 1, Direction.S],
    [x, y - 1, Direction.N],
    [x - 1, y, Direction.W],
  ],
}

const fingerprint = ([, [x, y, direction], , steps]: Step): number =>
  (y << 16) | (x << 8) | (direction << 4) | steps

const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((l) => l.trim().split('').map(Number))

const solve = (input: string, maxSteps: number, minSteps?: number) => {
  const grid = parse(input)
  const end = { x: grid[0].length - 1, y: grid.length - 1 }

  const queue = new Heap<Step>(([hA], [hB]) => hA - hB)
  const visited = new Set<number>()

  const east: Step = [0, [0, 0, Direction.E], 0, 0]
  const south: Step = [0, [0, 0, Direction.S], 0, 0]

  queue.push(east, south)
  visited.add(fingerprint(east)).add(fingerprint(south))

  while (queue.size()) {
    const [, [x, y, direction], heatLoss, steps] = queue.pop()!

    if (x === end.x && y === end.y) {
      // If we have to take a minimum number of steps, then we can't stop
      if (minSteps !== undefined && steps < minSteps) continue
      return heatLoss
    }

    const nextPositions = getNextPositions[direction](x, y)
      .filter(([, , newDirection]) => {
        if (minSteps !== undefined && steps < minSteps)
          return newDirection === direction
        return steps > maxSteps - 1 ? newDirection !== direction : true
      })
      .filter(([x, y]) => x >= 0 && x <= end.x && y >= 0 && y <= end.y)

    for (const [nextX, nextY, nextDirection] of nextPositions) {
      const nextStep: Step = [
        heatLoss + grid[nextY][nextX] + end.x - nextX + end.y - nextY,
        [nextX, nextY, nextDirection],
        heatLoss + grid[nextY][nextX],
        nextDirection === direction ? steps + 1 : 1,
      ]

      const key = fingerprint(nextStep)
      if (!visited.has(key)) {
        visited.add(key)
        queue.push(nextStep)
      }
    }
  }

  return -1
}

export const part1 = (input: string) => solve(input, 3)
export const part2 = (input: string) => solve(input, 10, 4)
