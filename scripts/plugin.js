import fs from 'fs/promises'

export function binaryString() {
    return {
        name: 'binary',
        setup(build) {
            build.onLoad({ filter: /\.png|jpg$/ }, async (args) => {
                const filePath = args.path
                const data = await fs.readFile(filePath)
                const bin = data.toString('binary')
                return {
                    contents: encodeURIComponent(bin),
                    loader: 'text'
                }
            })
        }
    }
}

export default binaryString
