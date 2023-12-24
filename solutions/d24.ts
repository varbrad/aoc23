const regex =
  /(-?\d+),\s+(-?\d+),\s+(-?\d+)\s+@\s+(-?\d+),\s+(-?\d+),\s+(-?\d+)/
type Line = {
  x: number
  y: number
  z: number
  m: number
  c: number
  dx: number
  dy: number
  dz: number
}
const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map<Line>((l) => {
      const [x, y, z, dx, dy, dz] = l.match(regex)!.slice(1).map(Number)
      const m = dy / dx
      const c = y - m * x
      return { x, y, z, dx, dy, dz, m, c }
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

      // parallel lines - will never intersect
      if (lA.m === lB.m) {
        continue
      }

      const intersectX = (lB.c - lA.c) / (lA.m - lB.m)

      if (lA.dx > 0 ? intersectX < lA.x : intersectX > lA.x) {
        continue
      }

      if (lB.dx > 0 ? intersectX < lB.x : intersectX > lB.x) {
        continue
      }

      if (intersectX < minBound) continue
      if (intersectX > maxBound) continue

      const intersectY = lA.m * intersectX + lA.c

      if (lA.dy > 0 ? intersectY < lA.y : intersectY > lA.y) {
        continue
      }

      if (lB.dy > 0 ? intersectY < lB.y : intersectY > lB.y) {
        continue
      }

      if (intersectY < minBound) continue
      if (intersectY > maxBound) continue

      sum++
    }
  }
  return sum
}
