<template>
    <div :class="elementClass('app-accordion-item')">
        <div
            @click="toggleItem"
            class="app-accordion-item__header"
        >
            <span :class="elementClass('app-accordion-item__button')">
                <span
                    v-if="state"
                    class="app-accordion-item__button--minus"
                >-</span>
                <span
                    v-if="!state"
                    class="app-accordion-item__button--plus"
                >+</span>
            </span>
            <slot name="header" />
        </div>
        <transition
            @enter="animationEnter"
            @leave="animationLeave"
        >
            <div
                v-show="state"
                class="app-accordion-item__body"
            >
                <slot name="body" />
            </div>
        </transition>
    </div>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
    name: 'app-accordion-item',
    props: {
        id: {
            type: String,
            default: '',
            required: true
        }
    },
    data () {
        return {
            state: false,
            duration: 300,
            name: 'app-accordion-item',
            itemId: `accordion-${this.id}`
        }
    },
    methods: {
        elementClass (classname) {
            return [
                classname,
                {
                    'is-active': this.state
                }
            ]
        },
        toggleItem () {
            this.state = !this.state

            this.$parent.$emit('toggle-item', {
                itemId: this.itemId
            })
        },
        animationEnter (el, done) {
            Velocity(el, 'slideDown', { duration: this.duration })
        },
        animationLeave (el, done) {
            Velocity(el, 'slideUp', { duration: this.duration })
        }
    }
}
</script>

<style lang="scss">
.app-accordion-item {
    transition: background-color $transition;

    &.is-active {
        background-color: $dark-grey;
    }

    + .app-accordion-item {
        margin-top: 2px;
    }

    &__header {
        display: block;
        padding: 1.5rem 4rem 1.5rem 2rem;
        position: relative;
        font-size: 1rem;
        line-height: 1.4;
        font-weight: 800;
        color: $dark-blue;
        text-decoration: none;
        transition: background-color $transition, color $transition;
        user-select: none;
        cursor: pointer;

        &:hover,
        &:focus {
            color: $dark-blue;
            background-color: $dark-grey;
        }

        &:active {
            color: $dark-blue;
            background-color: $dark-grey;
        }
    }

    &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 100%;
        overflow: hidden;
        margin: auto;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        font-size: 1.5rem;
        font-style: normal;
        border-radius: 50%;
        transition: transform .3s;

        &.is-active {
            transform: rotate(180deg);
        }
    }

    &__body {
        padding: 2rem;
        font-size: .875rem;
        line-height: 1.4;
        font-weight: 400;
        color: $dark-blue;
    }
}
</style>
