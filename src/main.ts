import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import metaInfo from '@/meta'
import router from '@/router'
import { TippyComponent } from 'vue-tippy'
import importComponents from '@/utils/importComponents'

import '@/utils/filters'
import '@/utils/directives'
import i18n from '@/utils/i18n'

importComponents()

Vue.component('tippy', TippyComponent)

new Vue({
    el: '#app',
    i18n,
    store,
    router,
    metaInfo,
    render: h => h(App)
}).$mount('#app')
