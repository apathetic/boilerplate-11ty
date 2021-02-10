import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { injectManifest } from 'rollup-plugin-workbox';

const dev = process.env.NODE_ENV !== 'production';
const plugins = [
  postcss({
    config: { path: 'config/postcss.config.js', ctx: null },
    extract: 'dist/static/main.bundle.css',
    minimize: !dev,
  }),
  replace({
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'process.env.PUBLIC_URL': dev ? 'localhost' : `''`,
    'process.env.TIME_STAMP': `"${new Date().toISOString()}"`
  }),
  resolve(),
  commonjs(),
  !dev && terser(),
];

export default [
  {
    input: 'src/scripts/main.js',
    output: {
      format: 'es',
      name: 'main.bundle',
      entryFileNames: '[name].bundle.js',
      dir: 'dist/static/',
      sourcemap: dev,
    },
    plugins,
  }, {
    input: 'src/scripts/main.js',
    output: {
      format: 'system',
      dir: 'dist/static/',
      sourcemap: dev,
    },
    plugins,
  }, {
    input: 'src/scripts/service-worker/sw.js',
    output: {
      format: 'es',
      file: 'dist/sw.js',
    },
    plugins: [
      injectManifest({
        swSrc: 'dist/sw.js', // src/scripts/service-worker/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
      }),
      ...plugins
    ]
  }, {
    input: 'src/scripts/about.js',
    output: {
      format: 'iife',
      name: 'about',
      file: 'dist/static/about.js',
    },
    plugins,
  },
];
