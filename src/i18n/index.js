import Vue from 'vue'
// 多语言
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

Vue.use(VueI18n)
import en from './langs/en'
import zh from './langs/zh'

export const messages = {
  en,
  zh
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: Cookies.get('lang') || 'zh', // 设置地区
  messages // 设置地区信息
})

export default i18n
