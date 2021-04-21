import Vue from 'vue'
import VueRouter from 'vue-router'

import ConstructorPage from '@/pages/constructor/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'is-current',
    routes: [
        {
            path: '/',
            component: ConstructorPage,
            meta: {
                title: 'Resume Constructor - Constructor page'
            }
        }
    ]
})

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title ? to.meta.title : 'default title'
    })
})

export default router
