# aoc23

## Notes

- Day 24
  - Part 2 was solved using the Z3 theorem prover - but the npm library does not work in Bun - so I had to make a seperate JS script that runs in Node.js instead. This is not commited as part of the repo. See [./solutions/d24.ts](./solutions/d24.ts) for more info.
- Day 25
  - There is no part 2.

## Usage

To install dependencies:

```bash
bun install
```

To test:

```bash
bun test
```

To benchmark:

```bash
bun benchmark.ts
```

[Click here to view the latest benchmark runs in CI](https://github.com/varbrad/aoc23/actions/workflows/benchmark.yml)