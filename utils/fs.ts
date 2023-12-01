import fs from 'fs'
import path from 'path'

export const readInput = async (name: string) => fs.readFileSync(path.join(import.meta.dir, '../input', name), 'utf-8')
