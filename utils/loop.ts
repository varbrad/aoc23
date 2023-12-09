export const loopSum = <T>(map: (n: T) => number, arr: T[]) => {
  let sum = 0
  for (let i = 0; i < arr.length; ++i) {
    sum += map(arr[i])
  }
  return sum
}

export const loopProduct = <T>(map: (n: T) => number, arr: T[]) => {
  let product = 1
  for (let i = 0; i < arr.length; ++i) {
    product *= map(arr[i])
  }
  return product
}
