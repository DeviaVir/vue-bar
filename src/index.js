import Bars from './components/bars'

Bars.install = function (Vue) {
  Vue.component(Bars.name, Bars)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Bars)
}

export default Bars
