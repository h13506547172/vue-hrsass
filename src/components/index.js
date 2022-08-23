import PageTools from '@/components/PageTools'
import MyTest from '@/components/MyTest'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import Calendar from '@/components/Calendar'
import fullScreen from '@/components/fullScreen'
import toggleLang from "@/components/toggleLang";
const components = [
  PageTools,
  MyTest,
  UploadExcel,
  UploadImg,
  Calendar,
  fullScreen,
  toggleLang
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
