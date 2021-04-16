<template>
    <transition
        @before-enter="appearAnimationBefore"
        @enter="appearAnimationEnter"
        @leave="appearAnimationLeave"
    >
        <div
            v-if="active"
            class="app-popup"
        >
            <slot />
        </div>
    </transition>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
    name: 'app-popup',
    props: {
        active: Boolean
    },
    data () {
        return {
            duration: 300
        }
    },
    methods: {
        appearAnimationBefore (el) {
            el.style.opacity = 0
        },
        appearAnimationEnter (el, done) {
            Velocity(el, { opacity: 1 }, { duration: this.duration }, { complete: done })
        },
        appearAnimationLeave (el, done) {
            Velocity(el, { opacity: 0 }, { duration: this.duration })
            Velocity(el, { display: 'none' }, { complete: done })
        }
    }
}
</script>

<style lang="scss">
.app-popup {
    min-width: 100%;
    padding: 1.5rem;
    position: absolute;
    top: 90%;
    z-index: 999;
    background-color: $gray-lite;
    box-shadow: .5rem .5rem 0 0 rgba($black, .1);
}
</style>
