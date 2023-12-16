type Beam = [x: number, y: number, dx: number, dy: number]

export const solve = (
  grid: ('.' | '|' | '-' | '/' | '\\')[][],
  initial: Beam,
) => {
  const w = grid[0].length
  const h = grid.length

  const memory = new Set<string>()

  const moveBeam = ([x, y, dx, dy]: Beam, set: Set<string>): number => {
    const nx = x + dx
    const ny = y + dy
    if (memory.has(`${nx},${ny},${dx},${dy}`)) return set.size
    if (nx < 0 || nx >= w || ny < 0 || ny >= h) return set.size
    set.add(`${nx},${ny}`)
    memory.add(`${nx},${ny},${dx},${dy}`)
    const cell = grid[ny][nx]
    if (cell === '\\') return moveBeam([nx, ny, dy, dx], set)
    else if (cell === '/') return moveBeam([nx, ny, -dy, -dx], set)
    else if (cell === '|' && dy === 0) {
      moveBeam([nx, ny, 0, -1], set)
      moveBeam([nx, ny, 0, 1], set)
    } else if (cell === '-' && dx === 0) {
      moveBeam([nx, ny, -1, 0], set)
      moveBeam([nx, ny, 1, 0], set)
    } else {
      moveBeam([nx, ny, dx, dy], set)
    }
    return set.size
  }

  return moveBeam(initial, new Set())
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
