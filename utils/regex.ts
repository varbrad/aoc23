export const execAll = (regex: RegExp, input: string) => {
  const matches: RegExpExecArray[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(input)) != null) {
    matches.push(match)
  }
  return matches
}
