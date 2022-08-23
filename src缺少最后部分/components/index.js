import PageTools from './PageTools'
import UpdateExcel from "./UpdateExcel";
import UploadImg from "./UploadImg";
const components = [PageTools,UpdateExcel,UploadImg]
export default {
  install(Vue) {
    components.forEach((component) => {
      // 要在每个组件里面写好name
      Vue.component(component.name, component)
    })
  }
}
