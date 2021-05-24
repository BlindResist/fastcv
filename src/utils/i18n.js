import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Lang from '@/utils/lang'
import LocalesEN from '@/locales/en'
import LocalesRU from '@/locales/ru'

Vue.use(VueI18n)

export default new VueI18n({
    messages: {
        en: LocalesEN,
        ru: LocalesRU
    },
    locale: new Lang().get()
})
