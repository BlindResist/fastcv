import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import MainPage from '@/pages/Main/index.vue'
import ConstructorPage from '@/pages/Constructor/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/constructor',
        component: ConstructorPage
    }
]

const router = new VueRouter({
    routes
})

export default router
