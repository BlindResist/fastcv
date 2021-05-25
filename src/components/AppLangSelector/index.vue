<template>
    <div class="app-lang-selector">
        <template v-for="lang in langs">
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

<script>
export default {
    name: 'app-lang-selector',
    data () {
        return {
            langs: this.$root.langs,
            current: this.$root.lang,
            storage: window.localStorage
        }
    },
    methods: {
        change (lang) {
            this.current = lang
            this.$i18n.locale = lang
            this.storage.setItem('lang', lang)
            this.$bus.$emit('change-lang', lang)
        }
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
