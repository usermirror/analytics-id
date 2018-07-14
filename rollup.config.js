const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const { uglify } = require('rollup-plugin-uglify')
const { startCase } = require('lodash')

const PKG = require('./package.json')

function configure(env, target) {
  const isProd = env === 'production'
  const isUmd = target === 'umd'
  const isModule = target === 'module'
  const input = `src/index.js`
  const deps = []
    .concat(PKG.dependencies ? Object.keys(PKG.dependencies) : [])
    .concat(PKG.peerDependencies ? Object.keys(PKG.peerDependencies) : [])

  const plugins = [
    resolve({
      // browser: true
    }),
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    babel({
      include: [`src/**`],
      presets: [['env', { modules: false }]]
    }),
    isUmd && isProd && uglify()
  ].filter(Boolean)

  if (isUmd) {
    return {
      plugins,
      input,
      output: {
        format: 'umd',
        file: isProd ? 'dist/analytics-id.min.js' : 'dist/analytics-id.js',
        name: startCase(PKG.name).replace(/ /g, '')
      }
    }
  }

  if (isModule) {
    return {
      plugins,
      input,
      output: [
        {
          file: PKG.module,
          format: 'es',
          sourcemap: true
        },
        {
          file: PKG.main,
          format: 'cjs',
          sourcemap: true
        }
      ],
      external: id => {
        return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`))
      }
    }
  }
}

export default [
  configure('development', 'module'),
  process.env.NODE_ENV === 'production' && configure('development', 'umd'),
  process.env.NODE_ENV === 'production' && configure('production', 'umd')
].filter(Boolean)
