<template>
    <div class="app-lang-selector">
        <div class="app-lang-selector__inner">
            <a
                href="#"
                :key="lang"
                v-for="lang in langs"
                @click.prevent="change(lang)"
                class="app-lang-selector__link"
            >{{ lang.toUpperCase() }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-lang-selector',
    data () {
        return {
            langs: this.$root.langs,
            storage: window.localStorage
        }
    },
    methods: {
        change (lang) {
            this.storage.setItem('lang', lang)
            this.$nextTick(() => this.$router.go())
        }
    }
}
</script>

<style lang="scss">
.app-lang-selector {

    &__inner {}

    &__link {}
}
</style>
