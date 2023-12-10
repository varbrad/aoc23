import fs from 'fs/promises'
import path from 'path'
import c from 'chalk'
import invariant from 'tiny-invariant'

const isDefined = <T>(x: T | undefined): x is T => x !== undefined

const tryCall = (fn: () => void): boolean => {
  try {
    fn()
    return true
  } catch (e) {
    return false
  }
}

const MAX_TIME = 1000
const MAX_ITERATIONS = 1000
const benchmark = (fn: (input: string) => unknown, input: string) => {
  const start = performance.now()
  const results: { time: number; ok: boolean }[] = []
  while (
    results.length < MAX_ITERATIONS &&
    performance.now() - start < MAX_TIME
  ) {
    const a = performance.now()
    const ok = tryCall(() => fn(input))
    const b = performance.now()
    results.push({ time: b - a, ok })
  }
  return results
}

const getOutput = (
  label: string,
  fn: (...args: unknown[]) => unknown,
  input: string,
) => {
  const result = benchmark(fn, input)
  const loops = result.length
  const average = result.reduce((a, b) => a + b.time, 0) / loops
  const fails = result.filter((r) => !r.ok).length
  const executionsPerSecond = 1000 / average
  const output = [
    (fails > 0 ? c.red : c.green)(' > ' + label.padStart(6, ' ')),
    c.yellow((average.toFixed(3) + 'ms').padStart(16, ' ')),
    c.yellow(executionsPerSecond.toFixed(0).padStart(16, ' ')),
    c.yellow(
      (Math.min(...result.map((r) => r.time)).toFixed(3) + 'ms').padStart(
        16,
        ' ',
      ),
    ),
    c.yellow(
      (Math.max(...result.map((r) => r.time)).toFixed(3) + 'ms').padStart(
        16,
        ' ',
      ),
    ),
    c.gray(`${loops}`.padStart(16, ' ')),
    fails > 0 ? c.red(('fails: ' + fails).padStart(16, ' ')) : '',
  ]
  return {
    output,
    average,
  }
}

const run = async () => {
  const solutionDir = await fs.readdir(
    path.join(import.meta.dir, './solutions'),
  )
  const inputDir = await fs.readdir(path.join(import.meta.dir, './input'))

  const solRegex = /^d(\d+)\.ts$/
  const solutions = solutionDir
    .map((s) => solRegex.exec(s)?.[1])
    .filter((s) => isDefined(s) && inputDir.includes(`d${s}.txt`))
    .map((s) => ({ day: Number(s), file: `d${s}.ts`, input: `d${s}.txt` }))
    .sort((a, b) => a.day - b.day)

  const results = []

  for (const sol of solutions) {
    try {
      console.log(
        ...[
          c.cyan(('Day ' + sol.day).padEnd(9, ' ')),
          c.gray('average'.padStart(16, ' ')),
          c.gray('loops/s'.padStart(16, ' ')),
          c.gray('min'.padStart(16, ' ')),
          c.gray('max'.padStart(16, ' ')),
          c.gray('loops'.padStart(16, ' ')),
        ],
      )
      const imported = await import(
        path.join(import.meta.dir, './solutions', sol.file)
      )
      const input = await fs.readFile(
        path.join(import.meta.dir, './input', sol.input),
        { encoding: 'utf-8' },
      )

      invariant(imported, 'Solution file could not be imported!')

      if (imported.part1) {
        const { output, average } = getOutput('Part 1', imported.part1, input)
        results.push({ day: sol.day, part: 1, average })
        console.log(...output)
      } else {
        console.log(c.gray(' > part1 not implemented'))
      }

      if (imported.part2) {
        const { output, average } = getOutput('Part 2', imported.part2, input)
        results.push({ day: sol.day, part: 2, average })
        console.log(...output)
      } else {
        console.log(c.gray(' > part2 not implemented'))
      }

      console.log('')
    } catch (e) {
      console.error(c.red(' > ' + (e instanceof Error ? e.message : String(e))))
    }
  }

  results.sort((a, b) => a.average - b.average)
  console.log(c.magenta('Fastest -> slowest'))
  results.forEach((r, i) => {
    console.log(
      c.gray(`#${i + 1}`.padStart(3, ' ')),
      c.cyan(('Day ' + r.day).padEnd(6, ' ')),
      c.yellow('Part ' + r.part),
      c.gray((r.average.toFixed(3) + 'ms').padStart(16, ' ')),
    )
  })

  console.log('')

  const totalAverageExecutionTime = results.reduce(
    (prev, curr) => prev + curr.average,
    0,
  )

  console.log(
    c.magenta('Total average execution time for all solutions:'),
    c.yellow(totalAverageExecutionTime.toFixed(3) + 'ms'),
  )
}

run()
