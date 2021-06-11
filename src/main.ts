import Vue from 'vue'
import App from './App.vue'
import metaInfo from '@/meta'
import router from '@/router'
import { TippyComponent } from 'vue-tippy'
import importComponents from '@/utils/importComponents'

import '@/utils/filters'
import '@/utils/directives'
import Lang from '@/utils/lang'
import i18n from '@/utils/i18n'

importComponents()

Vue.component('tippy', TippyComponent)

new Vue({
    el: '#app',
    i18n,
    router,
    metaInfo,
    data: {
        langs: ['ru', 'en'],
        lang: new Lang().get()
    },
    render: h => h(App)
}).$mount('#app')
