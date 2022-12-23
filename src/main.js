/// <reference types="types-for-adobe/AfterEffects/18.0"/>
/// <reference types="types-for-adobe/shared/ScriptUI"/>

import { notify } from './modules/utils.js'
import merge from 'just-merge'
import expression from './modules/expression.js?text'
import icon from './icons/icon.png'

const obj = { a: 3, b: 5 }
const merged = merge(obj, { a: 4, c: 8 })
notify(`My merged object in JSON:\n${JSON.stringify(merged, '', 2)}`)

const greetings = [expression, IM_IN_ENV]
greetings.forEach(notify)

const dialog = new Window('dialog')
dialog.add('iconbutton', undefined, File.decode(icon))
dialog.show()
