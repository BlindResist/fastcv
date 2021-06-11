import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Lang from '@/utils/lang'
import en from '@/locales/en'
import ru from '@/locales/ru'

Vue.use(VueI18n)

export default new VueI18n({
    messages: { en, ru },
    locale: new Lang().get()
})
