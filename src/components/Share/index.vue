<template>
    <div class="share">
        <span class="share__text">{{ $t('mainpage.share') }}</span>
        <div class="share__links">
            <a
                target="_blank"
                :key="item.name"
                :href="item.link"
                :title="item.name"
                v-for="item in share"
                :class="`share__link icon icon-${item.name}`"
            ></a>
        </div>
    </div>
</template>

<script lang="ts">
import VueI18n from 'vue-i18n'
import TranslateResult = VueI18n.TranslateResult
import { Component, Vue } from 'vue-property-decorator'

@Component

export default class Share extends Vue {
    url: string
    desc: TranslateResult
    title: TranslateResult

    constructor () {
        super()
        this.desc = this.$t('mainpage.text')
        this.title = this.$t('mainpage.title')
        this.url = 'http://www.fastcv.digama.online'
    }

    share (): {name: string, link: string}[] {
        return [
            {
                name: 'facebook',
                link: `https://www.facebook.com/sharer/sharer.php?u=${this.url}`
            },
            {
                name: 'twitter',
                link: `https://twitter.com/share?url=${this.url}&text=${this.desc}`
            },
            {
                name: 'vkontakte',
                link: `http://vk.com/share.php?url=${this.url}&title=${this.title}&description=${this.desc}&noparse=true`
            }
        ]
    }
}
</script>

<style lang="scss">
.share {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    &__text {
        display: block;
        margin-right: 1rem;
    }

    &__links {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
    }

    &__link {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 .5rem;
        font-size: 1.5rem;
        transition: color $transition;

        &:hover {
            color: $yellow-dark;
        }
    }
}
</style>
