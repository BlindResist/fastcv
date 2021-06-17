<template>
    <div class="app-lang-selector">
        <template v-for="lang in languages">
            <app-link
                prevent
                hover="no"
                :key="lang"
                :underline="false"
                v-if="lang !== current"
                class="app-lang-selector__link"
                v-processing="{ callback: change, data: lang }"
            >{{ lang.toUpperCase() }}</app-link>
        </template>
    </div>
</template>

<script lang="ts">
import AppLink from '@/components/AppLink/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        AppLink
    }
})

export default class AppLangSelector extends Vue {
    languages: string[]
    current: string

    constructor () {
        super()
        this.current = this.$store.state.lang
        this.languages = this.$store.state.languages
    }

    change (lang: string): void {
        this.current = lang
        this.$i18n.locale = lang
        window.localStorage.setItem('lang', lang)
        this.$store.commit('changeLang', lang)
    }
}
</script>

<style lang="scss">
.app-lang-selector {
    user-select: none;

    &__link {
        display: block;
        padding: .5rem;
        font-size: .75rem;
        color: $blue-dark;
        border-radius: 6px;
        background-color: $gray-dark;
    }
}
</style>
