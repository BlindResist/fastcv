import Vue from 'vue'
import VueRouter from 'vue-router'

import Constructor from '@/pages/Constructor/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'is-current',
    routes: [
        {
            path: '/',
            component: Constructor,
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
