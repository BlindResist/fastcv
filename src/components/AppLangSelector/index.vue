<template>
    <div class="app-lang-selector">
        <template v-for="lang in langs">
            <a
                href="#"
                :key="lang"
                v-if="lang !== current"
                @click.prevent="change(lang)"
                class="app-lang-selector__link"
            >{{ lang.toUpperCase() }}</a>
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
        }
    }
}
</script>

<style lang="scss">
.app-lang-selector {

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
