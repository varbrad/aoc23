import { isDefined } from '../utils/types'

type Galaxy = [number, number]

const parse = (input: string, factor: number) => {
  // Parse all the initial galaxy positions
  const galaxies = input
    .trim()
    .split('\n')
    .flatMap((line, y) =>
      line
        .trim()
        .split('')
        .map<Galaxy | null>((char, x) => (char === '#' ? [x, y] : null)),
    )
    .filter(isDefined)

  // Whats the bounds of our galaxies in the X & Y axes
  const [maxX, maxY] = galaxies.reduce(
    ([maxX, maxY], [x, y]) => [Math.max(maxX, x), Math.max(maxY, y)],
    [-1, -1],
  )

  // Expand the universe in the X axis
  for (let x = maxX; x >= 0; x--)
    if (galaxies.some(([_x]) => _x === x)) continue
    else galaxies.forEach((g) => g[0] > x && (g[0] += factor - 1))

  // Expand the universe in the Y axis
  for (let y = maxY; y >= 0; y--)
    if (galaxies.some(([, _y]) => _y === y)) continue
    else galaxies.forEach((g) => g[1] > y && (g[1] += factor - 1))

  return galaxies
}

// Manhattan distance formula
const distance = (a: Galaxy, b: Galaxy) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

const solve = (input: string, factor: number) => {
  const galaxies = parse(input, factor)
  let sum = 0
  for (let i = 0; i < galaxies.length - 1; ++i)
    for (let j = i + 1; j < galaxies.length; ++j)
      sum += distance(galaxies[i], galaxies[j])
  return sum
}

export const part1 = (input: string) => solve(input, 2)
export const part2 = (input: string) => solve(input, 1_000_000)
