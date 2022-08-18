import { renameSync } from 'fs'
import { readdir } from 'fs/promises'
import { fork } from 'child_process'
import readdirp from 'readdirp'
import { homedir } from 'os'
import path from 'path'

const devmode = process.env.NODE_ENV === 'development'
const outdir = devmode ? 'build' : 'dist'

const curDir = path.resolve(outdir)
const foundScripts = await readdirp.promise(curDir, { fileFilter: '*.jsx' })
const scripts = foundScripts.map((f) => f.fullPath)
const exportJSXBin = await getExtensionPath()

scripts.forEach((script) => {
    fork(exportJSXBin, ['-f', '-n', script])
        .on('close', () => renameSync(`${script}bin`, script))
})

async function getExtensionPath() {
    const extensionsPath = path.join(homedir(), '.vscode', 'extensions')
    const extensions = await readdir(extensionsPath)
    const extensionName = 'adobe.extendscript-debug'
    const extendscript = extensions.find((f) => f.includes(extensionName))
    return path.join(extensionsPath, extendscript, 'public-scripts', 'exportToJSXBin.js')
}
