type Point = [number, number]

const distancePointToLine = (
  point: Point,
  start: Point,
  end: Point,
): number => {
  const [x, y] = point
  const [x1, y1] = start
  const [x2, y2] = end
  const numerator = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1)
  const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2)
  return numerator / denominator
}

export const douglasPeucker = (points: Point[], epsilon: number): Point[] => {
  if (points.length <= 2) return points

  let dmax = 0
  let index = 0
  const start = points[0]
  const end = points[points.length - 1]

  for (let i = 1; i < points.length - 1; i++) {
    const d = distancePointToLine(points[i], start, end)
    if (d > dmax) {
      index = i
      dmax = d
    }
  }

  if (dmax > epsilon) {
    const recursiveResult1 = douglasPeucker(points.slice(0, index + 1), epsilon)
    const recursiveResult2 = douglasPeucker(points.slice(index), epsilon)

    const result = recursiveResult1.slice(0, -1).concat(recursiveResult2)
    return result
  } else {
    return [start, end]
  }
}

export const isInside = (vertices: Point[], x: number, y: number) => {
  let inside = false
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const [xi, yi] = vertices[i]
    const [xj, yj] = vertices[j]

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi

    if (intersect) inside = !inside
  }
  return inside
}
