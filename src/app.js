import Vue from 'vue'
import router from '@/router'
import importComponents from '@/utils/importComponents'

import '@/utils/filters'
import '@/utils/directives'
import Lang from '@/utils/lang'

importComponents()

Object.defineProperty(Vue.prototype, '$bus', {
    get: () => this.$root.bus
})

window.vm = new Vue({
    el: '#app',
    router,
    data: {
        bus: new Vue({}),
        langs: ['ru', 'en'],
        lang: new Lang().get(),
        brand: {
            name: 'Fast!CV',
            url: 'fastcv.online'
        }
    }
})
