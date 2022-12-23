import { readFile } from 'fs/promises'
import { join, isAbsolute } from 'path'

// SOURCE: https://github.com/hannoeru/esbuild-plugin-raw
export default function textLoader() {
    const namespace = 'text-loader'
    const filter = /\?text$/
    return {
        name: 'textloader',
        setup(build) {
            build.onResolve({ filter }, (args) => {
                return {
                    namespace,
                    path: args.path,
                    pluginData: {
                        isAbsolute: isAbsolute(args.path),
                        resolveDir: args.resolveDir,
                    },
                }
            })
            build.onLoad({ filter, namespace }, async ({ path, pluginData }) => {
                const { resolveDir, isAbsolute } = pluginData
                const fullPath = isAbsolute ? path : join(resolveDir, path)
                const withoutSuffix = fullPath.replace(filter, '')
                return {
                    contents: await readFile(withoutSuffix),
                    loader: 'text',
                }
            })
        },
    }
}
