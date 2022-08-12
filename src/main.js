import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// 组件、自定义指令、过滤器
import * as directives from '@/directives/index'
import component from '@/components/index'
import * as filters from '@/filters/index'

// 模拟假数据的
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 循环添加 自定义指令
for (const key in directives) {
  Vue.directive(key, directives[key])
}
for (const key in filters) {
  Vue.filter(key, filters[key])
}
// 注册组件
Vue.use(component)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
