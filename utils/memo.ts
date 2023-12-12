export const memoize = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): ((...args: Args) => Return) => {
  const cache = new Map<string, Return>()
  return (...args) => {
    const key = JSON.stringify(args)
    if (!cache.has(key)) cache.set(key, fn(...args))
    return cache.get(key)!
  }
}
