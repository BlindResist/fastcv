<template>
    <main class="page">
        <section class="main-page">
            <div class="main-page__content">
                <div class="main-page__block">
                    <app-logo big />
                </div>
                <div class="main-page__block">
                    <p v-html="$t('mainpage.text')"></p>
                </div>
                <div class="main-page__block">
                    <app-button
                        rounded
                        theme="yellow"
                        v-processing="{ callback: goToConstructor }"
                    >{{ $t('buttons.build') }}</app-button>
                </div>
                <div class="main-page__block">
                    <share />
                </div>
            </div>
            <app-lang-selector />
        </section>
        <app-footer />
    </main>
</template>

<script>
import Share from '@/components/Share/index.vue'

export default {
    name: 'main-page',
    components: {
        Share
    },
    computed: {
        lang () {
            return this.$root.lang
        }
    },
    methods: {
        goToConstructor () {
            this.$router.push('constructor')
        }
    }
}
</script>

<style lang="scss">
.main-page {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: $gray-lite;

    &__content {
        max-width: 50vw;

        @include breakpoint(mobile) {
            max-width: 80vw;
        }
    }

    &__block {
        text-align: center;

        &+& {
            margin-top: 2rem;
        }
    }

    .app-lang-selector {
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 1;
    }

    .app-button {
        display: inline-flex;
        width: 15rem;
    }
}
</style>
