import { notify } from './modules/utils.js'
import merge from 'just-merge'

const obj = { a: 3, b: 5 }
const merged = merge(obj, { a: 4, c: 8 })
notify(`My merged object in JSON:\n${JSON.stringify(merged, '', 2)}`)

const greetings = ['hey', IM_IN_ENV]
greetings.forEach(notify)
