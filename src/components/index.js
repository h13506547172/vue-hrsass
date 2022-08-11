import PageTools from './PageTools'
const components = [PageTools]
export default {
  install(Vue) {
    components.forEach((component) => {
      // 要在每个组件里面写好name
      Vue.component(component.name, component)
    })
  }
}
