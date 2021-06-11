<template>
    <div :class="elementClass('app-accordion-item')">
        <div
            @click="toggleItem"
            :class="elementClass('app-accordion-item__header')"
        >
            <span :class="elementClass('app-accordion-item__button')">&#62;</span>
            <slot name="header" />
        </div>
        <transition
            @enter="animationEnter"
            @leave="animationLeave"
        >
            <div
                v-show="state"
                :class="elementClass('app-accordion-item__body')"
            >
                <slot name="body" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Velocity from 'velocity-animate'
import { Component, Prop, Vue } from 'vue-property-decorator'


@Component

export default class AppAccordionItem extends Vue {
    @Prop({
        type: String,
        default: '',
        required: true
    }) readonly id!: string

    name: string
    state: boolean
    itemId: string
    duration: number

    constructor () {
        super()
        this.state = false
        this.duration = 300
        this.name = 'app-accordion-item'
        this.itemId = `accordion-${this.id}`
    }

    elementClass (classname: string): string {
        let result = classname

        if (this.state) result += ` ${classname}--active`

        return result
    }

    toggleItem (): void {
        this.state = !this.state

        this.$parent.$emit('toggle-item', {
            itemId: this.itemId
        })
    }

    animationEnter (el: HTMLElement): void {
        Velocity(el, 'slideDown', { duration: this.duration })
    }

    animationLeave (el: HTMLElement): void {
        Velocity(el, 'slideUp', { duration: this.duration })
    }
}
</script>

<style lang="scss">
.app-accordion-item {
    border-bottom: 1px solid $gray-lite;
    transition: background-color $transition;

    + .app-accordion-item {
        margin-top: 2px;
    }

    &__header {
        display: block;
        padding: 1.5rem 4rem 1.5rem 2rem;
        position: relative;
        font-size: 1rem;
        line-height: 1.4;
        font-weight: 700;
        color: $blue-dark;
        text-decoration: none;
        transition: background-color $transition, color $transition;
        user-select: none;
        cursor: pointer;

        &:hover,
        &:focus {
            color: $blue-dark;
            background-color: $gray-dark;
        }

        &:active {
            color: $blue-dark;
            background-color: $gray-dark;
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
        font-size: 1rem;
        font-style: normal;
        border-radius: 50%;
        transform: rotate(90deg);
        transition: transform .3s;

        &--active {
            transform: rotate(270deg);
        }
    }

    &__body {
        padding: 2rem;
        font-size: .875rem;
        line-height: 1.4;
        font-weight: 400;
        color: $blue-dark;
        transition: background-color $transition;

        &--active {
            background-color: $gray-lite;
        }
    }
}
</style>
