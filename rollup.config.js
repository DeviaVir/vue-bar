import buble from 'rollup-plugin-buble'

export default {
  input: 'src/index.js',
  plugins: [buble()],
  output: [
    { name: 'vue-bars', file: 'dist/vue-bars.js', format: 'umd' },
    { name: 'vue-bars', file: 'dist/vue-bars.common.js', format: 'cjs' },
    { name: 'vue-bars', file: 'dist/vue-bars.esm.js', format: 'es' }
  ]
}
