import copyStaticFiles from 'esbuild-copy-static-files'
import babel from 'esbuild-plugin-babel'
import binaryString from './binary.js'
import textLoader from './text.js'
import { build } from 'esbuild'
import { join } from 'path'
import fs from 'fs-extra'
import glob from 'glob'
import 'dotenv/config'

const entryPoints = glob.sync('src/*.js')
const devmode = process.env.NODE_ENV === 'development'
const outdir = devmode ? 'build' : 'dist'
const pkg = await fs.readJson('./package.json')
const out = entryPoints.length === 1 ? { outfile: join(outdir, `${pkg.name}.jsx`) } : { outdir }
const define = {
    'DEVMODE': devmode,
    'PRODUCT_NAME': JSON.stringify(pkg.name),
    'PRODUCT_DISPLAY_NAME': JSON.stringify(pkg.displayName),
    'PRODUCT_VERSION': JSON.stringify(pkg.version),
}

for (const key in process.env) {
    const invalid = key.includes('(x86)')
    if (!invalid) {
        define[key] = JSON.stringify(process.env[key])
    }
}

build({
    ...out,
    define,
    entryPoints,
    logLevel: 'info',
    bundle: true,
    sourcemap: devmode,
    target: ['es5'],
    minifyWhitespace: !devmode,
    minifyIdentifiers: !devmode,
    outExtension: { '.js': '.jsx' },
    plugins: [
        copyStaticFiles({ dest: outdir }),
        binaryString(),
        textLoader(),
        babel({
            config: {
                presets: [
                    ['extendscript', { modules: false }]
                ]
            }
        }),
    ],
    watch: devmode && {
        onRebuild(error) {
            if (error) console.error(error)
        },
    }
})
