import { sum } from 'lodash'

const parse = (input: string) => {
  const map = input
    .trim()
    .split('\n')
    .map((l) => l.trim().split(''))
  const sX = map.findIndex((l) => l.includes('S'))
  const sY = map[sX].findIndex((c) => c === 'S')
  map[sX][sY] = '.'
  return { map, sX, sY }
}

export const part1 = (input: string, maxSteps = 64) => {
  const { map, sX, sY } = parse(input)
  return totalNeighbours(map, sX, sY, maxSteps)
}

export const part2 = (input: string) => {
  const { map, sX, sY } = parse(input)
  const mapWidth = map.length

  // How many repeating gardens can we fit in 26,501,365 steps?
  const gardenGridDiameter = Math.floor(26_501_365 / mapWidth) - 1

  /**
   * The gardens end up being filled in a big sort of "diamond" shape, where
   * the interior gardens will either fall on an odd or even "shape" of the
   * path, so we need to count how many we have of each, as it is completely
   * infeasible to try and brute-force simulate them all.
   */
  const oddCells = (Math.floor(gardenGridDiameter / 2) * 2 + 1) ** 2
  const evenCells = (Math.floor((gardenGridDiameter + 1) / 2) * 2) ** 2

  /**
   * Now we know _how_ many of the odd and even gardens there will be, we need
   * to simulate them both once to see how many steps are possible in each.
   */
  const oddGardenPlots = totalNeighbours(map, sX, sY, mapWidth * 2 + 1)
  const evenGardenPlots = totalNeighbours(map, sX, sY, mapWidth * 2)

  // Now we need to calculate how many steps are possible in the 4 corner gardens
  const edgeGardens = sum(
    [
      [sX, mapWidth - 1],
      [0, sY],
      [sX, 0],
      [mapWidth - 1, sY],
    ].map(([x, y]) => totalNeighbours(map, x, y, mapWidth - 1)),
  )

  // And finally, we need to calculate how many steps are possible in the corner gardens
  const nesw = [
    [0, mapWidth - 1],
    [mapWidth - 1, mapWidth - 1],
    [0, 0],
    [mapWidth - 1, 0],
  ]

  // We can now calculate how many steps are possible in the gardens that are on the
  // "inside" of the diagonal line forming the diamond
  const closerSteps = Math.floor(mapWidth / 2) - 1
  const smallGardens =
    (gardenGridDiameter + 1) *
    sum(nesw.map(([x, y]) => totalNeighbours(map, x, y, closerSteps)))

  // We can now calculate how many steps are possible in the gardens that are on the
  // "outside" of the diagonal line forming the diamond
  const longerSteps = Math.floor((mapWidth * 3) / 2) - 1
  const largeGardens =
    gardenGridDiameter *
    sum(nesw.map(([x, y]) => totalNeighbours(map, x, y, longerSteps)))

  // The interior gardens is now easy to calculate - just multiply the number of
  // "odd" gardens by the number of steps possible in each, and do the same for
  // the "even" gardens
  const interiorGardens =
    oddCells * oddGardenPlots + evenCells * evenGardenPlots

  // And it's then just a case of adding them all together
  return interiorGardens + smallGardens + largeGardens + edgeGardens
}

// De-dupe the visited cells by using a single number to represent a x,y,distance
const fingerprint = (x: number, y: number, d: number) =>
  (d << 16) | (y << 8) | x

const totalNeighbours = (
  map: string[][],
  x: number,
  y: number,
  maxSteps: number,
  visited = new Set<number>(),
  distance = 0,
): number => {
  const key = fingerprint(x, y, distance)
  if (visited.has(key)) return 0
  visited.add(key)
  if (distance === maxSteps) return 1
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].reduce((prev, [nx, ny]) => {
    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < map[0].length &&
      ny < map.length &&
      map[ny][nx] === '.'
    ) {
      prev += totalNeighbours(map, nx, ny, maxSteps, visited, distance + 1)
    }
    return prev
  }, 0)
}
