import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  plugins: [buble()],
  moduleName: 'vue-bars',
  targets: [
    { dest: 'dist/vue-bars.js', format: 'umd' },
    { dest: 'dist/vue-bars.common.js', format: 'cjs' },
    { dest: 'dist/vue-bars.esm.js', format: 'es' }
  ]
}
