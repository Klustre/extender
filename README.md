# extender

A modern starter for writing Adobe Extendscript

_(yes, another one)_

## Why?

Writing Extendscript (EcmaScript 3) is rather annoying once you're used to modern Javascript. You expect to use array methods and common practices such as `.env` files, no-nonsense bundling, rebuilding on changes, etc.

Other starters don't actually transform modern Javascript, so you have to write helper functions for your beloved array methods which totally defeats the point of writing modern Javascript. You might polyfill them, but that pollutes the global scope _(which is bad for everyone if you found a shitty implementation on Stack Overflow)._

## Features

- Modern Javascript with [ponyfills](https://github.com/sindresorhus/ponyfill#how-are-ponyfills-better-than-polyfills) (see [babel-preset-extendscript](https://github.com/fusepilot/babel-preset-extendscript))
- EcmaScript Modules for importing and exporting
- Fast bundling with [esbuild](https://github.com/evanw/esbuild) _(TODO: insert obligatory lightning bolt emoji)_
- Rebundles on file changes
- Minifies the release version
- Converts to binary with [extendscript-debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug)
- Wraps bundle in an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) to avoid global variables
- Exposes environment variables to Javascript files
- Ponyfills JSON (no need to include it)
- Copies static files from `/static` (with [esbuild-copy-static-files](https://github.com/nickjj/esbuild-copy-static-files))

## Try the example

1. Duplicate `.env.example` and remove the `.example` extension
1. Run `npm install && npm start` in your terminal
1. Run `/build/extender.jsx` in your Adobe app of choice

## Development

```
npm install && npm start
```

This will start watching your source files and builds into the `build` folder.

## Release

```
npm run release
```

This will bundle, minify and jsxbin your source files into the `dist` folder.

## Environment Variables

All variables are replaced by their values upon bundling.

By default the bundler exposes:

- `DEVMODE` when `NODE_ENV` is `development` or not,
- `PRODUCT_NAME` which is `name` from `package.json`,
- `PRODUCT_DISPLAY_NAME` which is `displayName` from `package.json` and
- `PRODUCT_VERSION` which is `version` from `package.json`

If you have a `.env` file it will automatically expose the variables by their name to all Javascript files.

## Entrypoints

Every `.js` file in the root of the `source/` folder is considered an entrypoint. Multiple entrypoints will result in multiple scripts being bundled separately, keeping the same name as their entrypoint. If there's a single entrypoint it will be renamed to `name` from `package.json`.

## Debugging

Press `F5` in VSCode to launch the debugger and you will be prompted for the host application. To avoid the prompt set the `hostAppSpecifier` in `launch.json`

You can't use breakpoints in your source files, because the [Extendscript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug) doesn't support source maps. Instead, use a `debugger` statement in your source files or set breakpoints in the bundled file (`/build/{PRODUCT_NAME}.jsx`).

## Import JavaScript as String

To import JavaScript files as strings you can suffix them with `.text.js` and import them with a custom default name. This is useful when you have expressions that you want to import as strings. Having them as separate files allows you to format and lint them separately, use TypeScript definitions on them, etc.

See [src/main.js](https://github.com/Klustre/extender/blob/main/src/main.js#L3) and [src/expression.text.js](https://github.com/Klustre/extender/blob/main/src/modules/expression.text.js)

## Import Node Modules

You can import Node modules by simply using `import xyz from 'xyz'`. Note that they can't contain browser or Node APIs. Also note that quite some modern Javascript **is not yet** ponyfilled by [babel-preset-extendscript](https://github.com/fusepilot/babel-preset-extendscript#features).

## Static Files

The contents of `/static` will be copied to the `outdir` whenever you run the bundler. This is useful for icons, readme files, etc. Note that any changes in this folder will not be watched, so you need to run the bundler again or save a change in your source files.

## Minification

Only whitespaces are removed and variable names are shortened. The syntax remains intact to avoid Extendscript errors.

## Typescript

You should even be able to [make it work with Typescript](https://esbuild.github.io/content-types/#typescript) if that's your thing.
