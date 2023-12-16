type Beam = [x: number, y: number, dx: number, dy: number]

export const solve = (
  grid: ('.' | '|' | '-' | '/' | '\\')[][],
  initial: Beam,
) => {
  const w = grid[0].length
  const h = grid.length

  const memory = new Set<string>()

  const moveBeam = ([x, y, dx, dy]: Beam, set: Set<string>): void => {
    const nx = x + dx
    const ny = y + dy
    if (memory.has(`${nx},${ny},${dx},${dy}`)) return
    if (nx < 0 || nx >= w || ny < 0 || ny >= h) return
    set.add(`${nx},${ny}`)
    memory.add(`${nx},${ny},${dx},${dy}`)
    const cell = grid[ny][nx]
    if (cell === '\\') moveBeam([nx, ny, dy, dx], set)
    else if (cell === '/') moveBeam([nx, ny, -dy, -dx], set)
    else if (cell === '|' && dy === 0) {
      moveBeam([nx, ny, 0, -1], set)
      moveBeam([nx, ny, 0, 1], set)
    } else if (cell === '-' && dx === 0) {
      moveBeam([nx, ny, -1, 0], set)
      moveBeam([nx, ny, 1, 0], set)
    } else {
      moveBeam([nx, ny, dx, dy], set)
    }
  }

  const set = new Set<string>()
  moveBeam(initial, set)
  return set.size
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
    max = Math.max(
      max,
      solve(grid, [x, -1, 0, 1]),
      solve(grid, [x, grid.length, 0, -1]),
    )
  }

  for (let y = 0; y < grid.length; ++y) {
    max = Math.max(
      max,
      solve(grid, [-1, y, 1, 0]),
      solve(grid, [grid[0].length, y, -1, 0]),
    )
  }

  return max
}
