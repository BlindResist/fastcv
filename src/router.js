import Vue from 'vue'
import i18n from '@/utils/i18n'
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

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = i18n.t('title')
    })
})

export default router
