import Vue from 'vue'
import VueMeta from 'vue-meta'
import i18n from '@/utils/i18n'

Vue.use(VueMeta)

export default () => {
    return {
        title: i18n.t('title'),
        noscript: [
            {
                innerHTML: 'Fast!CV requires JavaScript!'
            }
        ],
        meta: [
            {
                name: 'robots',
                content: 'index, nofollow'
            },
            {
                name: 'author',
                content: i18n.t('meta.author')
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            },
            {
                name: 'keywords',
                content: i18n.t('meta.keywords')
            },
            {
                name: 'description',
                content: i18n.t('meta.description')
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no'
            },
            {
                vmid: 'og:title',
                property: 'og:title',
                content: i18n.t('title')
            },
            {
                vmid: 'og:url',
                property: 'og:url',
                content: 'https://fastcv.digama.online/'
            },
            {
                vmid: 'og:type',
                property: 'og:type',
                content: 'website'
            },
            {
                vmid: 'og:image',
                property: 'og:image',
                content: 'https://fastcv.digama.online/images/fast!cv-logo.png'
            },
            {
                vmid: 'og:image:alt',
                property: 'og:image:alt',
                content: 'Fast!CV logotype'
            },
            {
                vmid: 'og:description',
                property: 'og:description',
                content: i18n.t('meta.description')
            },
            {
                vmid: 'twitter:title',
                property: 'twitter:title',
                content: i18n.t('title')
            },
            {
                vmid: 'twitter:url',
                property: 'twitter:url',
                content: 'https://fastcv.digama.online/'
            },
            {
                vmid: 'twitter:image',
                property: 'twitter:image',
                content: 'https://fastcv.digama.online/images/fast!cv-logo.png'
            },
            {
                vmid: 'twitter:image:alt',
                property: 'twitter:image:alt',
                content: 'Fast!CV logotype'
            },
            {
                vmid: 'twitter:description',
                property: 'twitter:description',
                content: i18n.t('meta.description')
            }
        ]
    }
}
