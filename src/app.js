import Vue from 'vue'
import data from '@/data.js'
import router from '@/router.js'

// components

const requireComponent = require.context(
    './components',
    true,
    /App[\w-]+\/index\.js$/
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = fileName.split('/')[1]
    Vue.component(componentName, componentConfig.default || componentConfig)
})

Object.defineProperty(Vue.prototype, '$bus', {
    get () {
        return this.$root.bus
    }
})

/* eslint-disable no-new */
const vm = new Vue({
    el: '#app',
    data: {
        app: data,
        bus: new Vue({})
    },
    router,
    mounted () {}
})

window.vm = vm
