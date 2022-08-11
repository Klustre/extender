import { renameSync } from 'fs'
import { readdir } from 'fs/promises'
import { fork } from 'child_process'
import readdirp from 'readdirp'
import { homedir } from 'os'
import path from 'path'

const devmode = process.env.NODE_ENV === 'development'
const outdir = devmode ? 'build' : 'dist'

const extensionName = 'adobe.extendscript-debug'
const extensionPath = path.join(homedir(), '.vscode', 'extensions')
const extensions = await readdir(extensionPath)
const extendscript = extensions.find((f) => f.includes(extensionName))
const exportJSXBin = path.join(extensionPath, extendscript, 'public-scripts', 'exportToJSXBin.js')
const curDir = path.resolve(outdir)
const foundScripts = await readdirp.promise(curDir, { fileFilter: '*.jsx' })
const scripts = foundScripts.map((f) => f.fullPath)

scripts.forEach((script) => {
    fork(exportJSXBin, ['-f', '-n', script])
        .on('close', () => renameSync(`${script}bin`, script))
})
