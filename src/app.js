import Vue from 'vue'
import verge from 'verge'
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

Object.defineProperty(Vue.prototype, '$bus', {
    get () {
        return this.$root.bus
    }
})

window.vm = new Vue({
    el: '#app',
    i18n,
    router,
    metaInfo,
    data: {
        viewportW: 0,
        loaded: false,
        bus: new Vue({}),
        processing: false,
        langs: ['ru', 'en'],
        lang: new Lang().get()
    },
    mounted () {
        this.loaded = true
        this.viewportW = verge.viewportW()

        this.$bus.$on('change-lang', lang => { this.lang = lang })
        this.$bus.$on('processing', state => { this.processing = state })
    },
    beforeDestroy () {
        this.$bus.$off('change-lang', lang => { this.lang = lang })
        this.$bus.$off('processing', state => { this.processing = state })
    }
})
