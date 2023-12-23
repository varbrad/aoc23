import { cloneDeep, partition } from 'lodash'
import * as d22u from './d22.utils'

export const part1 = (input: string) => {
  const cuboids = d22u.parse(input)

  // First, sort the cuboids so the one with the lowest z value is first
  cuboids.sort((a, b) => {
    const az = Math.min(a.z, a.z2)
    const bz = Math.min(b.z, b.z2)
    return az - bz
  })

  // Next, move the cuboids down as far we can move them
  for (let i = 0; i < cuboids.length; i++) {
    const c = cuboids[i]
    // Lets try and keep moving down
    // eslint-disable-next-line no-constant-condition
    outer: while (true) {
      // Are we touching the ground?
      const minZ = Math.min(c.z, c.z2)
      if (minZ === 1) break outer

      // Try moving down
      c.z--
      c.z2--

      for (let j = i - 1; j >= 0; j--) {
        const c2 = cuboids[j]
        if (d22u.isIntersecting(c, c2)) {
          // We can't move down
          c.z++
          c.z2++
          break outer
        }
      }
    }
  }

  const supportList: [string, string][] = []
  for (let i = 0; i < cuboids.length; ++i) {
    const c = cuboids[i]
    const cuboidUp = cloneDeep(c)
    cuboidUp.z++
    cuboidUp.z2++
    for (let j = i + 1; j < cuboids.length; ++j) {
      const c2 = cuboids[j]
      if (d22u.isIntersecting(cuboidUp, c2)) {
        supportList.push([c.label, c2.label])
      }
    }
  }

  let safelyDestroy = 0
  cuboidLoop: for (let i = 0; i < cuboids.length; ++i) {
    const label = cuboids[i].label
    const [supporting, leftover] = partition(supportList, (s) => s[0] === label)
    for (const [_, l2] of supporting) {
      const isBeingSupported = leftover.some((s) => s[1] === l2)
      if (!isBeingSupported) continue cuboidLoop
    }
    safelyDestroy++
  }

  return safelyDestroy
}

const collapse = (cuboids: d22u.Cuboid[]) => {
  let fallen = 0
  for (let i = 0; i < cuboids.length; i++) {
    const c = cuboids[i]
    // Lets try and keep moving down
    // eslint-disable-next-line no-constant-condition
    let fell = false
    outer: while (true) {
      // Are we touching the ground?
      const minZ = Math.min(c.z, c.z2)
      if (minZ === 1) break outer

      // Try moving down
      c.z--
      c.z2--

      for (let j = i - 1; j >= 0; j--) {
        const c2 = cuboids[j]
        if (d22u.isIntersecting(c, c2)) {
          // We can't move down
          c.z++
          c.z2++
          break outer
        }
      }
      fell = true
    }
    if (fell) fallen++
  }
  return fallen
}

export const part2 = (input: string) => {
  const cuboids = d22u.parse(input)

  // First, sort the cuboids so the one with the lowest z value is first
  cuboids.sort((a, b) => {
    const az = Math.min(a.z, a.z2)
    const bz = Math.min(b.z, b.z2)
    return az - bz
  })

  // Next, move the cuboids down as far we can move them
  collapse(cuboids)

  let sum = 0
  for (let i = 0; i < cuboids.length; ++i) {
    const clone = cloneDeep(cuboids)
    clone.splice(i, 1)
    const fallen = collapse(clone)
    console.log(cuboids[i].label, fallen)
    sum += fallen
  }

  return sum
}
