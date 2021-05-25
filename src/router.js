import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from '@/pages/main/index.vue'
import ConstructorPage from '@/pages/constructor/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'is-current',
    routes: [
        {
            path: '/',
            component: MainPage
        },
        {
            path: '/constructor',
            component: ConstructorPage
        }
    ]
})

export default router
