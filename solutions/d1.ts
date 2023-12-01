const DIGIT_MAP: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const solve = (input: string, considerStrings: boolean) => {
  const matchString = considerStrings
    ? `\\d|${Object.keys(DIGIT_MAP).join('|')}`
    : `\\d`
  const firstDigitRegex = new RegExp(`^.*?(${matchString}).*$`)
  const lastDigitRegex = new RegExp(`^.*(${matchString}).*?$`)

  return input
    .trim()
    .split('\n')
    .reduce((prev, line) => {
      const firstDigit = line.match(firstDigitRegex)?.[1]
      const lastDigit = line.match(lastDigitRegex)?.[1]
      if (!firstDigit || !lastDigit)
        throw new Error(`Couldnt find a digit in the line "${line}"`)
      return (
        prev +
        Number(
          `${DIGIT_MAP[firstDigit] ?? firstDigit}${
            DIGIT_MAP[lastDigit] ?? lastDigit
          }`,
        )
      )
    }, 0)
}

export const part1 = (input: string) => solve(input, false)
export const part2 = (input: string) => solve(input, true)
