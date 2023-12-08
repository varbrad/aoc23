const parse = (input: string) => {
  const [seeds, ...sections] = input.split('\n\n').map((s) => s.trim())
  return [
    seeds
      .match(/seeds: ([\d ]*)/)![1]
      .split(' ')
      .map(Number),
    sections.map((s) =>
      s
        .match(/\w+-to-\w+ map:([\d \n]*)/)![1]
        .trim()
        .split('\n')
        .map((row) => {
          const [dest, source, range] = row.trim().split(' ').map(Number)
          return {
            dest: [dest, dest + range + 1] as const,
            src: [source, source + range + 1] as const,
          }
        }),
    ),
  ] as const
}

type Seed = ReturnType<typeof parse>[0][number]
type Maps = ReturnType<typeof parse>[1]

const toLocation = (maps: Maps, value: Seed) =>
  maps.reduce((curr, map) => {
    for (const m of map) {
      if (curr >= m.src[0] && curr < m.src[1])
        return curr + m.dest[0] - m.src[0]
    }
    return curr
  }, value)

const toSeed = (maps: Maps, value: Seed) =>
  maps.reduceRight((curr, map) => {
    for (let i = 0; i < map.length; ++i) {
      const m = map[i]
      if (curr >= m.dest[0] && curr < m.dest[1])
        return curr + m.src[0] - m.dest[0]
    }
    return curr
  }, value)

const solve = (seeds: Seed[], maps: Maps) =>
  Math.min(...seeds.map((s) => toLocation(maps, s)))

export const part1 = (input: string) => solve(...parse(input))

const isValidSeed = (seeds: Seed[]) => (seed: Seed) => {
  for (let i = 0; i < seeds.length; i += 2) {
    const [a, b] = seeds.slice(i, i + 2)
    if (seed >= a && seed < a + b) return true
  }
  return false
}

export const part2 = (input: string) => {
  const [seeds, maps] = parse(input)

  const possibleSeeds = maps
    .flatMap((m, i) =>
      m.map(({ dest }) => toSeed(maps.slice(0, i + 1), dest[0])),
    )
    .filter(isValidSeed(seeds))

  return solve(possibleSeeds, maps)
}
