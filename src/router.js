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
            component: MainPage,
            meta: {
                title: 'Fast!CV - Easy & fast CV constructor'
            }
        },
        {
            path: '/constructor',
            component: ConstructorPage,
            meta: {
                title: 'Fast!CV - Constructor'
            }
        }
    ]
})

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title ? to.meta.title : 'Fast!CV - Easy & fast CV constructor'
    })
})

export default router
