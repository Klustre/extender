// TODO: Copy static files
import copyStaticFiles from 'esbuild-copy-static-files'
import babel from 'esbuild-plugin-babel'
import { build } from 'esbuild'
import fs from 'fs-extra'
import 'dotenv/config'

const devmode = process.env.NODE_ENV === 'development'

const outdir = devmode ? 'build' : 'dist'
const pkg = await fs.readJson('./package.json')

const options = {
    logLevel: 'info',
    entryPoints: [ 'src/app.js' ],
    define: {
        'DEVMODE': devmode,
        'PRODUCT_VERSION': JSON.stringify(pkg.version),
        'PRODUCT_NAME': JSON.stringify(pkg.name),
    },
}

for (const key in process.env) {
    options.define[key] = JSON.stringify(process.env[key])
}

build({
    ...options,
    outdir,
    bundle: true,
    sourcemap: devmode,
    plugins: [
        babel({
            config: {
                presets: [
                    ['extendscript', { modules: false }]
                ]
            }
        }),
    ],
    target: ['es5'],
    minify: !devmode,
    outExtension: { '.js': '.jsx' },
    watch: devmode && {
        onRebuild(error) {
            if (error) console.error(error)
        },
    }
})
