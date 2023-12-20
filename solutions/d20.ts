import { lcm, product } from '../utils/maths'

type Node =
  | {
      type: 'broadcaster'
      to: string[]
    }
  | { type: 'flip-flop'; label: string; state: boolean; to: string[] }
  | {
      type: 'conjunction'
      label: string
      memory: Record<string, boolean>
      to: string[]
    }

class Machine {
  pulses: { low: number; high: number }

  public static parse(input: string) {
    const raw = input
      .trim()
      .split('\n')
      .map<Node>((l) => {
        const [first, rest] = l.trim().split(' -> ')
        const to = rest.split(', ')
        if (first === 'broadcaster') return { type: 'broadcaster', to }
        if (first.startsWith('%'))
          return {
            type: 'flip-flop',
            label: first.slice(1),
            state: false,
            to,
          }
        return { type: 'conjunction', label: first.slice(1), memory: {}, to }
      })

    raw.forEach((n) => {
      if (n.type !== 'conjunction') return
      const inputs = raw.filter((n2) => 'to' in n2 && n2.to.includes(n.label))
      for (const i of inputs) {
        if ('label' in i) {
          n.memory[i.label] = false
        }
      }
    })

    const map = new Map<string, Node>()

    for (const n of raw) {
      if ('label' in n) map.set(n.label, n)
      else map.set('broadcaster', n)
    }

    return new Machine(map)
  }

  constructor(public map: Map<string, Node>) {
    this.pulses = { low: 0, high: 0 }
  }

  pressN(n: number) {
    for (let i = 0; i < n; ++i) this.pressOnce()
    return this
  }

  highLowProduct() {
    return this.pulses.high * this.pulses.low
  }

  pressUntil(label: string) {
    let i = 0
    let flag = false
    const fn = (l: string) => {
      if (l === label) {
        flag = true
      }
    }
    while (!flag) {
      ++i
      this.pressOnce(fn)
    }
    return i
  }

  pressOnce(onLabelEmitTrue?: (label: string) => void) {
    // false = low, true = high
    type Pulse = [label: string, type: boolean, from: string]
    const queue: Pulse[] = [['broadcaster', false, 'button']]

    while (queue.length) {
      const [label, pulseType, from] = queue.shift()!
      pulseType ? this.pulses.high++ : this.pulses.low++
      const item = this.map.get(label)
      if (!item) {
        continue
      }
      switch (item.type) {
        case 'broadcaster': {
          item.to.forEach((l) => {
            queue.push([l, false, label])
          })
          break
        }
        case 'flip-flop': {
          if (pulseType === true) continue
          item.state = !item.state
          item.to.forEach((l) => {
            queue.push([l, item.state, label])
          })
          break
        }
        case 'conjunction': {
          item.memory[from] = pulseType
          const nextPulse = !Object.values(item.memory).every((b) => b === true)
          if (nextPulse) onLabelEmitTrue?.(label)
          item.to.forEach((l) => {
            queue.push([l, nextPulse, label])
          })
          break
        }
      }
    }
  }

  clone(): Machine {
    return new Machine(structuredClone(this.map))
  }
}

export const part1 = (input: string) =>
  Machine.parse(input).pressN(1000).highLowProduct()

export const part2 = (input: string) => {
  const machine = Machine.parse(input)
  const entries = Array.from(machine.map.entries())
  const [toRxLabel] = entries.find(([, node]) => node.to.includes('rx'))!

  return product(
    entries
      .filter(([, node]) => node.to.includes(toRxLabel))
      .map(([label]) => label)
      .map((labelToFind) => machine.clone().pressUntil(labelToFind)),
  )
}
