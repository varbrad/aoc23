//// Helpers written before the day started:

import { sum } from 'lodash/fp'
import { loopSum } from '../utils/loop'
import { memoize } from '../utils/memo'

/**
 * Memoize this function, because if the input is the same (row & group), the answer
 * will always be the same. Plus, we see the same row/group combinations a lot, especially
 * as this solution is _recursive_ so we will never repeat any work we have already seen.
 */
const calculateVariants = memoize((row: string, groups: number[]): number => {
  // Skip over any leading dots
  if (row[0] === '.') return calculateVariants(row.slice(1), groups)

  // If we have no groups left, check if we have any #s left
  // If we do, then we have an invalid group, so return 0
  if (groups.length === 0) {
    return row.indexOf('#') === -1 ? 1 : 0
  }

  // Check if we can even fit the groups in the row
  if (row.length < sum(groups) + groups.length - 1) {
    return 0
  }

  // If our next item is a #, then try and fit it to a group
  if (row[0] === '#') {
    const [groupSize, ...remainingGroups] = groups
    // If we have a . in the next 'groupSize' spots, we have an invalid group
    if (row.slice(0, groupSize).indexOf('.') !== -1) return 0
    // If we have a # at the end of the grouping, it would mean the group is too big, so we have an invalid group
    if (row[groupSize] === '#') {
      return 0
    }
    // Otherwise we have found a valid group, so we can skip over the group and continue to the next one
    return calculateVariants(row.slice(groupSize + 1), remainingGroups)
  }

  // Calculate the two possibilities: . or #
  return (
    calculateVariants('#' + row.slice(1), groups) +
    calculateVariants('.' + row.slice(1), groups)
  )
})

export const solver = (input: string, n: number) => {
  return loopSum((line) => {
    const [str, nums] = line.trim().split(' ')
    const record = Array.from({ length: n }).fill(str).join('?')
    const groups = Array.from({ length: n })
      .fill(nums)
      .join(',')
      .split(',')
      .map(Number)
    return calculateVariants(record, groups)
  }, input.trim().split('\n'))
}

export const part1 = (input: string) => solver(input, 1)
export const part2 = (input: string) => solver(input, 5)
