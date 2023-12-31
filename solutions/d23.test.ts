import { describe, expect, it } from 'bun:test'
import { part1, part2 } from './d23'
import { readInput } from '../utils/fs'

describe('d23:p1', () => {
  it('should pass the example', () => {
    const input = `#.#####################
    #.......#########...###
    #######.#########.#.###
    ###.....#.>.>.###.#.###
    ###v#####.#v#.###.#.###
    ###.>...#.#.#.....#...#
    ###v###.#.#.#########.#
    ###...#.#.#.......#...#
    #####.#.#.#######.#.###
    #.....#.#.#.......#...#
    #.#####.#.#.#########v#
    #.#...#...#...###...>.#
    #.#.#v#######v###.###v#
    #...#.>.#...>.>.#.###.#
    #####v#.#.###v#.#.###.#
    #.....#...#...#.#.#...#
    #.#########.###.#.#.###
    #...###...#...#...#.###
    ###.###.#.###v#####v###
    #...#...#.#.>.>.#.>.###
    #.###.###.#.###.#.#v###
    #.....###...###...#...#
    #####################.#`

    expect(part1(input)).toEqual(94)
  })

  it('should pass the puzzle input', async () => {
    const input = await readInput('d23.txt')
    expect(part1(input)).toEqual(2070)
  })
})

describe('d23:p2', () => {
  const exampleA = `
    #.######
    #..#####
    ##.....#
    ######.#
    ####...#
    ####.#.#
    #....#.#
    #.####.#
    #..#...#
    ##.#.#.#
    ##...#.#
    ######.#
    #......#
    #.######
    #......#
    #.####.#
    #...##.#
    ###..#.#
    ####...#
    ######.#
    ######.#
  `

  it('should pass the example I made up', () => {
    expect(part2(exampleA)).toEqual(49)
  })

  it('should pass the example case', () => {
    const input = `#.#####################
    #.......#########...###
    #######.#########.#.###
    ###.....#.>.>.###.#.###
    ###v#####.#v#.###.#.###
    ###.>...#.#.#.....#...#
    ###v###.#.#.#########.#
    ###...#.#.#.......#...#
    #####.#.#.#######.#.###
    #.....#.#.#.......#...#
    #.#####.#.#.#########v#
    #.#...#...#...###...>.#
    #.#.#v#######v###.###v#
    #...#.>.#...>.>.#.###.#
    #####v#.#.###v#.#.###.#
    #.....#...#...#.#.#...#
    #.#########.###.#.#.###
    #...###...#...#...#.###
    ###.###.#.###v#####v###
    #...#...#.#.>.>.#.>.###
    #.###.###.#.###.#.#v###
    #.....###...###...#...#
    #####################.#`

    expect(part2(input)).toEqual(154)
  })

  it('should pass the puzzle input', async () => {
    const input = await readInput('d23.txt')
    expect(part2(input)).toEqual(6498)
  })
})
