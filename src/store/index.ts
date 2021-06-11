import Vue from 'vue'
import Vuex from 'vuex'
import Lang from '@/utils/lang'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        langs: ['ru', 'en'],
        lang: new Lang().get()
    },
    mutations: {},
    actions: {},
    modules: {}
})
