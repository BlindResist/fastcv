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
        link: [
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: './images/favicon/apple-touch-icon.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: './images/favicon/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: './images/favicon/favicon-16x16.png'
            },
            {
                rel: 'manifest',
                href: './site.webmanifest'
            },
            {
                rel: 'mask-icon',
                href: './images/favicon/safari-pinned-tab.svg',
                color: '#5bbad5'
            },
            {
                rel: 'shortcut icon',
                href: './images/favicon/favicon.ico'
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
                name: 'msapplication-TileColor',
                content: '#da532c'
            },
            {
                name: 'msapplication-config',
                content: './browserconfig.xml'
            },
            {
                name: 'theme-color',
                content: '#ffffff'
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
