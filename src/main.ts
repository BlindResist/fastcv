import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import metaInfo from '@/meta'
import { TippyComponent } from 'vue-tippy'

import '@/utils/filters'
import '@/utils/directives'
import i18n from '@/utils/i18n'

Vue.component('tippy', TippyComponent)

new Vue({
    i18n,
    store,
    router,
    metaInfo,
    render: h => h(App)
}).$mount('#app')
