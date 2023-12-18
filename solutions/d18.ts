import { isInside } from '../utils/polygons'

const rgx = /(\w) (\d+) \((#[\w\d]+)\)/
export const part1 = (input: string) => {
  const ins = input
    .trim()
    .split('\n')
    .map((l) => {
      const [dir, steps, colour] = l.match(rgx)!.slice(1)
      return { dir, steps: Number(steps), colour }
    })

  const trench: [number, number][] = [[0, 0]]
  ins.forEach(({ dir, steps }) => {
    for (let i = 0; i < steps; ++i) {
      trench.push([
        trench[trench.length - 1][0] + (dir === 'R' ? 1 : dir === 'L' ? -1 : 0),
        trench[trench.length - 1][1] + (dir === 'U' ? -1 : dir === 'D' ? 1 : 0),
      ])
    }
  })

  const { min, max } = trench.reduce(
    (prev, acc) => {
      const [x, y] = acc
      const [minX, minY] = prev.min
      const [maxX, maxY] = prev.max
      return {
        min: [Math.min(minX, x), Math.min(minY, y)],
        max: [Math.max(maxX, x), Math.max(maxY, y)],
      }
    },
    {
      min: [Infinity, Infinity],
      max: [-Infinity, -Infinity],
    },
  )

  let sum = 0
  for (let y = min[1]; y <= max[1]; ++y) {
    for (let x = min[0]; x <= max[0]; ++x) {
      const onLine = trench.some(([tx, ty]) => tx === x && ty === y)
      if (onLine) {
        sum++
        continue
      }
      const inside = isInside(trench, x, y)
      if (inside) {
        sum++
      }
    }
  }
  return sum
}
