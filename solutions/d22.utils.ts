export type Cuboid = Record<'x' | 'y' | 'z' | 'x2' | 'y2' | 'z2', number> & {
  label: string
}

export const parse = (input: string): Cuboid[] =>
  input
    .trim()
    .split('\n')
    .map((l, ix) => {
      const [a, b] = l.trim().split('~')
      const [x, y, z] = a.split(',').map(Number)
      const [x2, y2, z2] = b.split(',').map(Number)
      return { x, y, z, x2, y2, z2, label: String.fromCharCode(65 + ix) }
    })

export const printX = (cuboids: Cuboid[]) => {
  const minX = Math.min(...cuboids.map((c) => c.x))
  const maxX = Math.max(...cuboids.map((c) => c.x2))
  const minZ = Math.min(...cuboids.map((c) => c.z))
  const maxZ = Math.max(...cuboids.map((c) => c.z2))

  for (let z = maxZ; z >= minZ; z--) {
    let str = ''
    for (let x = minX; x <= maxX; x++) {
      const c = cuboids.find(
        (c) => c.x <= x && c.x2 >= x && c.z <= z && c.z2 >= z,
      )
      str += c?.label || '.'
    }
    console.log(str + ' ' + z)
  }
  console.log('-'.repeat(maxX - minX + 1) + ' 0')
}

export const printY = (cuboids: Cuboid[]) => {
  const minY = Math.min(...cuboids.map((c) => c.y))
  const maxY = Math.max(...cuboids.map((c) => c.y2))
  const minZ = Math.min(...cuboids.map((c) => c.z))
  const maxZ = Math.max(...cuboids.map((c) => c.z2))

  for (let z = maxZ; z >= minZ; z--) {
    let str = ''
    for (let y = minY; y <= maxY; y++) {
      const ix = cuboids.findIndex(
        (c) => c.y <= y && c.y2 >= y && c.z <= z && c.z2 >= z,
      )
      str += ix === -1 ? '.' : String.fromCharCode(65 + ix)
    }
    console.log(str + ' ' + z)
  }
  console.log('-'.repeat(maxY - minY + 1) + ' 0')
}

export const print = (cuboids: Cuboid[]) => {
  const minX = Math.min(...cuboids.map((c) => c.x))
  const maxX = Math.max(...cuboids.map((c) => c.x2))
  const minY = Math.min(...cuboids.map((c) => c.y))
  const maxY = Math.max(...cuboids.map((c) => c.y2))
  const minZ = Math.min(...cuboids.map((c) => c.z))
  const maxZ = Math.max(...cuboids.map((c) => c.z2))

  for (let z = maxZ; z >= minZ; z--) {
    console.log('z=' + z)
    for (let y = minY; y <= maxY; y++) {
      let str = ''
      for (let x = minX; x <= maxX; x++) {
        const ix = cuboids.findIndex(
          (c) =>
            c.x <= x &&
            c.x2 >= x &&
            c.y <= y &&
            c.y2 >= y &&
            c.z <= z &&
            c.z2 >= z,
        )
        str += ix === -1 ? '.' : String.fromCharCode(65 + ix)
      }
      console.log(str)
    }
    console.log('')
  }
}

export const isIntersecting = (c1: Cuboid, c2: Cuboid): boolean => {
  const overlapX = c1.x < c2.x2 + 1 && c1.x2 + 1 > c2.x
  if (!overlapX) return false

  const overlapY = c1.y < c2.y2 + 1 && c1.y2 + 1 > c2.y
  if (!overlapY) return false

  const overlapZ = c1.z < c2.z2 + 1 && c1.z2 + 1 > c2.z
  if (!overlapZ) return false

  return true
}
