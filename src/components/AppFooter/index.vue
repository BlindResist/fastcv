<template>
    <footer :class="elementClass">
        <div class="app-footer__inner">
            <span class="app-footer__text">
                {{ $t('footer.name') }}&nbsp;{{ $t('footer.version') }}
                <br>
                &#169;&nbsp;{{ currentYear }}&nbsp;{{ $t('footer.created') }}
                <app-link
                    blank
                    :href="href"
                >digama.online</app-link>
            </span>
        </div>
    </footer>
</template>

<script lang="ts">
import AppLink from '@/components/AppLink/index.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        AppLink
    }
})

export default class AppFooter extends Vue {
    @Prop(String) readonly location!: string

    href: string
    currentYear: number

    constructor () {
        super()
        this.href = 'http://digama.online/'
        this.currentYear = new Date().getFullYear()
    }

    get elementClass (): [string, {[elem: string]: boolean}] {
        return [
            'app-footer',
            {
                'app-footer--aside': this.location === 'aside'
            }
        ]
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
        line-height: 1.5;
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
