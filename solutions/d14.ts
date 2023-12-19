import { partition } from 'lodash'
import { isDefined } from '../utils/types'
import { pick } from 'lodash/fp'

type Rock = XY & { c: '#' | 'O' }
type XY = { x: number; y: number }
type sXY = `${number},${number}`

class RockGrid {
  private moveable: XY[]
  private fixed: XY[]
  private map: Map<sXY, '#' | 'O'>
  private w: number
  private h: number

  public static parse(input: string) {
    return new this(input)
  }

  constructor(input: string) {
    const cells = input
      .trim()
      .split('\n')
      .flatMap((line, y) =>
        line
          .trim()
          .split('')
          .map<Rock | null>((c, x) =>
            c === '#' || c === 'O' ? { x, y, c } : null,
          ),
      )
      .filter(isDefined)

    const [moveable, fixed] = partition(cells, (c) => c.c === 'O')
    this.moveable = moveable.map(pick(['x', 'y']))
    this.fixed = fixed.map(pick(['x', 'y']))
    this.map = new Map(cells.map(({ x, y, c }) => [`${x},${y}`, c]))
    this.w = Math.max(...cells.map((c) => c.x))
    this.h = Math.max(...cells.map((c) => c.y))
  }

  tilt(dx: number, dy: number) {
    for (const rock of this.moveable) {
      const { x, y } = rock
      let okx = x
      let oky = y
      let nx = okx + dx
      let ny = oky + dy
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // Can't escape bounds
        if (nx < 0 || nx > this.w || ny < 0 || ny > this.h) break
        const onCell = this.map.get(`${nx},${ny}`)
        // If it is a fixed rock, we can't move
        if (onCell === '#') break
        // Its either another movable rock, or nothing
        if (onCell === undefined) {
          okx = nx
          oky = ny
        }
        nx += dx
        ny += dy
      }
      if (okx !== rock.x || oky !== rock.y) {
        this.map.set(`${okx},${oky}`, 'O').delete(`${rock.x},${rock.y}`)
        rock.x = okx
        rock.y = oky
      }
    }

    return this
  }

  cycle() {
    return this.tilt(0, -1).tilt(-1, 0).tilt(0, 1).tilt(1, 0)
  }

  score() {
    return this.moveable.reduce((acc, { y }) => acc + (this.h - y + 1), 0)
  }
}

export const part1 = (input: string) =>
  RockGrid.parse(input).tilt(0, -1).score()

function findRepeatPointAndLength(sequence: number[]): {
  start: number
  length: number
} | null {
  const seen: { [key: number]: number } = {}

  for (let i = 0; i < sequence.length; i++) {
    const num = sequence[i]

    if (num in seen) {
      // The number is repeated, check if the sequence is repeating
      const repeatStart = seen[num]
      if (
        sequence.slice(repeatStart, i).toString() ===
        sequence.slice(i, i + (i - repeatStart)).toString()
      ) {
        const repeatLength = i - repeatStart
        if (repeatLength > 5)
          return { start: repeatStart, length: repeatLength }
      }
    } else {
      seen[num] = i
    }
  }

  return null
}

export const part2 = (input: string) => {
  const grid = RockGrid.parse(input)
  const scores = []
  // eslint-disable-next-line no-constant-condition
  while (true) {
    scores.push(grid.cycle().score())
    const pattern = findRepeatPointAndLength(scores)
    if (pattern !== null) {
      const repeating = scores.slice(
        pattern.start! - 1,
        pattern.start! + pattern.length - 1,
      )
      const n = 1_000_000_000 - pattern.start!
      return repeating[n % repeating.length]
    }
  }
}
