import Vue from 'vue'
import i18n from '@/i18n'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import metaInfo from '@/meta'
import { TippyComponent } from 'vue-tippy'

import '@/utils/filters'
import '@/utils/directives'

Vue.component('tippy', TippyComponent)

new Vue({
    i18n,
    store,
    router,
    metaInfo,
    render: h => h(App)
}).$mount('#app')
