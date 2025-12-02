import { createI18n } from 'vue-i18n'
import en from './en'
import zhCn from './zhCn'

export const languageList = [
  { key: 'zhCn', name: '中文', flag: 'zh-cn' },
  { key: 'en', name: 'English', flag: 'en-us' },
]
export const browserLanguage = navigator.language.toLowerCase().includes('zh') ? 'zhCn' : 'en'
const globalConfig = JSON.parse(localStorage.getItem('globalConfig') || '{}').globalConfig || {}
const i18n = createI18n({
  locale: globalConfig.language || browserLanguage,
  legacy: false,
  messages: { zhCn, en },
})

export default i18n
