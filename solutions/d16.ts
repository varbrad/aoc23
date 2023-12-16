type Beam = [x: number, y: number, dx: number, dy: number]

export const solve = (
  grid: ('.' | '|' | '-' | '/' | '\\')[][],
  initial: Beam,
) => {
  const beams: Beam[] = [initial]
  const w = grid[0].length
  const h = grid.length

  const memory = new Set<string>()
  const visited = new Set<string>()

  while (beams.length > 0) {
    for (let j = beams.length - 1; j >= 0; --j) {
      const [x, y, dx, dy] = beams.shift()!
      if (memory.has(`${x},${y},${dx},${dy}`)) continue
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue
      const c = grid[ny][nx]
      switch (c) {
        case '.':
          beams.push([nx, ny, dx, dy])
          break
        case '/': {
          beams.push([nx, ny, -dy, -dx])
          break
        }
        case '\\': {
          beams.push([nx, ny, dy, dx])
          break
        }
        case '-': {
          if (dy !== 0) {
            beams.push([nx, ny, -1, 0], [nx, ny, 1, 0])
          } else {
            beams.push([nx, ny, dx, dy])
          }
          break
        }
        case '|': {
          if (dx !== 0) {
            beams.push([nx, ny, 0, -1], [nx, ny, 0, 1])
          } else {
            beams.push([nx, ny, dx, dy])
          }
          break
        }
      }
      memory.add(`${x},${y},${dx},${dy}`)
      visited.add(`${nx},${ny}`)
    }
  }

  return visited.size
}

const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.trim().split('') as ('.' | '|' | '-' | '/' | '\\')[])

export const part1 = (input: string) => solve(parse(input), [-1, 0, 1, 0])
export const part2 = (input: string) => {
  const grid = parse(input)

  let max = -1
  for (let x = 0; x < grid[0].length; ++x) {
    const top = solve(grid, [x, -1, 0, 1])
    const bottom = solve(grid, [x, grid.length, 0, -1])
    max = Math.max(max, top, bottom)
  }

  for (let y = 0; y < grid.length; ++y) {
    const left = solve(grid, [-1, y, 1, 0])
    const right = solve(grid, [grid[0].length, y, -1, 0])
    max = Math.max(max, left, right)
  }

  return max
}
