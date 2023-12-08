export const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0)
export const product = (nums: number[]) => nums.reduce((a, b) => a * b, 1)

const lcm2 = (x: number, y: number) => (x * y) / gcd(x, y)
export const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y))
export const lcm = (...arr: number[]) => [...arr].reduce((a, b) => lcm2(a, b))
