import { lcm } from '../utils/maths'

const regex = /(\w+) = \((\w+), (\w+)\)/
const parse = (input: string) => {
  const [a, b] = input.split('\n\n')
  return {
    dirs: a
      .trim()
      .split('')
      .map((i) => (i === 'R' ? 1 : 0)),
    map: new Map<string, [string, string]>(
      b
        .trim()
        .split('\n')
        .map((r) => {
          const o = r.match(regex)!.slice(1)
          return [o[0], [o[1], o[2]]]
        }),
    ),
    steps: 0,
  }
}
type Parsed = ReturnType<typeof parse>
type Input = { pos: string; ghost: boolean }

const solve = (input: Parsed & Input): number => {
  for (const dir of input.dirs) {
    input.pos = input.map.get(input.pos)![dir]
    input.steps++
    if (input.pos.endsWith(input.ghost ? 'Z' : 'ZZZ')) return input.steps
  }
  return solve(input)
}

export const part1 = (input: string) =>
  solve({ ...parse(input), pos: 'AAA', ghost: false })

export const part2 = (input: string) => {
  const parsed = parse(input)
  return lcm(
    ...Array.from(parsed.map.keys())
      .filter((k) => k.endsWith('A'))
      .map((pos) => solve({ ...parsed, ghost: true, pos })),
  )
}
