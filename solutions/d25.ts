const parse = (input: string) => {
  const items = input
    .trim()
    .split('\n')
    .map((l) => l.trim().split(':'))

  const cnxs = new Map<string, Set<string>>()

  items.forEach((cnx) => {
    const [a, b] = cnx
    const bs = b.trim().split(' ')
    bs.forEach((b) => {
      cnxs.set(a, (cnxs.get(a) || new Set()).add(b))
      cnxs.set(b, (cnxs.get(b) || new Set()).add(a))
    })
  })

  return { cnxs }
}

/**
 * I parsed the input into a list of _nodes_ and _links_, and visualized it using
 * a Force-Directed Graph. From there, it was trivial to see the 3 connections
 * that could be removed to split the graph into 2 groups.
 *
 * Original input with the three paths in centre of the viewbox.
 * - https://observablehq.com/d/5e8102c43abb7da2@151
 *
 * Input with the three paths removed - forming two groups of connections.
 * - https://observablehq.com/d/5e8102c43abb7da2@152
 *
 * From there, it was trivial to "snip" those connections, and then count the
 * size of each "group" by picking a starting node in each group (I picked
 * `vqv` and `vms`), and counting the number of nodes reachable from that node
 * using a simple recursive function.
 */
export const part1 = (input: string) => {
  const { cnxs } = parse(input)

  /**
   * From the visualisation, we know the 3 links that need to be removed to
   * form 2 distinct groups are frl->thx, ccp->fvm, and lhg->llm.
   */
  const linksToRemove: [string, string][] = [
    ['frl', 'thx'],
    ['ccp', 'fvm'],
    ['lhg', 'llm'],
  ]
  // Delete the links in both directions
  linksToRemove.forEach(([a, b]) => {
    cnxs.get(a)!.delete(b)
    cnxs.get(b)!.delete(a)
  })

  // Fn to work out the size of a group, given a starting node.
  const getGroupSize = (node: string, group: Set<string> = new Set()) => {
    group.add(node)
    cnxs.get(node)!.forEach((n) => !group.has(n) && getGroupSize(n, group))
    return group.size
  }

  return getGroupSize('vqv') * getGroupSize('vms')
}
