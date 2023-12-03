export type Pos = { x: number; y: number }

export const isAdjacent = (a: Pos, b: Pos, diagonal = true) => {
  const dx = Math.abs(a.x - b.x)
  const dy = Math.abs(a.y - b.y)
  if (dx > 1 || dy > 1) return false
  if (diagonal) return dx + dy <= 2
  return dx + dy === 1
}
