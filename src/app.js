import Vue from 'vue'
import router from '@/router'
import importComponents from '@/utils/importComponents'

import '@/utils/filters'

importComponents()

Object.defineProperty(Vue.prototype, '$bus', {
    get () {
        return this.$root.bus
    }
})

const vm = new Vue({
    el: '#app',
    data: {
        bus: new Vue({})
    },
    router,
    mounted () {}
})

window.vm = vm
