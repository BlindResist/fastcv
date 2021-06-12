<template>
    <transition
        @before-enter="appearAnimationBefore"
        @enter="appearAnimationEnter"
        @leave="appearAnimationLeave"
    >
        <div
            v-if="active"
            class="app-preloader"
        >
            <div class="app-preloader__spinner"></div>
        </div>
    </transition>
</template>

<script lang="ts">
import Velocity from 'velocity-animate'
import { Prop, Vue } from 'vue-property-decorator'

export default class AppPreloader extends Vue {
    @Prop(Boolean) readonly active!: boolean

    duration: number

    constructor () {
        super()
        this.duration = 300
    }

    appearAnimationBefore (el: {style: {opacity: number}}): void {
        el.style.opacity = 0
    }

    appearAnimationEnter (el: HTMLElement, done: () => unknown): void {
        Velocity(el, { opacity: 1 }, { duration: this.duration }, { complete: done })
    }

    appearAnimationLeave (el: HTMLElement, done: () => unknown): void {
        Velocity(el, { opacity: 0 }, { duration: this.duration })
        Velocity(el, { display: 'none' }, { complete: done })
    }
}
</script>

<style lang="scss">
.app-preloader {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba($white, .8);
    user-select: none;

    &__spinner {
        width: 6rem;
        height: 6rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url('./spinner.svg');
    }
}
</style>
