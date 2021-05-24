<template>
    <footer :class="elClass">
        <div class="app-footer__inner">
            <span class="app-footer__text">
                &#169;&nbsp;{{ currentYear }}&nbsp;{{ $t('mainpage.footer') }}
                <app-link
                    blank
                    :href="href"
                >digama.online</app-link>
            </span>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'app-footer',
    props: {
        location: {
            type: String,
            default: 'main'
        }
    },
    data () {
        return {
            href: 'http://digama.online/',
            currentYear: new Date().getFullYear()
        }
    },
    computed: {
        elClass () {
            return [
                'app-footer',
                {
                    'app-footer--aside': this.location === 'aside'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.app-footer {
    width: 100%;
    padding: 2rem;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    pointer-events: none;

    @include breakpoint(mobile) {
        padding: 1rem;
    }

    &__inner {
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        justify-content: space-between;
        position: relative;
    }

    &__text {
        font-size: .875rem;
        pointer-events: auto;
        user-select: none;
        cursor: default;

        .love {
            transition: color .3s;
        }

        &:hover {

            .love {
                color: $red;
            }
        }
    }

    &__social {
        pointer-events: auto;
    }

    &--aside {
        margin-top: auto;
        position: static;
    }
}
</style>
