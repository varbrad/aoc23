const regex = /(-?\d+),\s+(-?\d+),\s+-?\d+\s+@\s+(-?\d+),\s+(-?\d+),\s+-?\d+/
type Line = { y: number; dy: number; m: number; c: number }
const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map<Line>((l) => {
      const [x, y, dx, dy] = l.match(regex)!.slice(1).map(Number)
      return { y, dy, m: dy / dx, c: y - (dy / dx) * x }
    })

export const part1 = (
  input: string,
  [minBound, maxBound]: [number, number] = [
    200_000_000_000_000, 400_000_000_000_000,
  ],
) => {
  const lines = parse(input)
  let sum = 0
  for (let i = 0; i < lines.length - 1; ++i) {
    const lA = lines[i]
    for (let j = i + 1; j < lines.length; ++j) {
      const lB = lines[j]
      // Parallel lines - will never intersect
      if (lA.m === lB.m) continue

      // Get the intersection point on the x-axis
      const xI = (lB.c - lA.c) / (lA.m - lB.m)
      // Check if the intersection point is within the bounds of the input
      if (xI < minBound || xI > maxBound) continue

      // Get the y value of the intersection point
      const yI = lA.m * xI + lA.c
      // Check if the intersection point is within the bounds of the input
      if (yI < minBound || yI > maxBound) continue
      // If the first y value is in the past, then skip
      if (lA.dy > 0 ? yI < lA.y : yI > lA.y) continue
      // If the second y value is in the past, then skip
      if (lB.dy > 0 ? yI < lB.y : yI > lB.y) continue

      // If we got here, the lines intersect in the future within the bounds
      sum++
    }
  }
  return sum
}

/**
 * Part 2 was a bit of a mess to be honest, I eventually managed to cobble together a solution
 * using the JavaScript library of the Z3 Solver (https://github.com/Z3Prover/z3).
 *
 * However, the library does not run at all when run using Bun, and so I had to run
 * my solutions in Node.js using some very janky code.
 *
 * The code was a giant mess and I honestly don't fully understand how it actually solved
 * the equations I fed into it, other than I got it to solve the example case (eventually)
 * and then just plugged in my input and it gave me a big number which was correct.
 */
