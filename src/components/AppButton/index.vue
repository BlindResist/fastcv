<template>
    <component
        :is="tag"
        class="app-button"
        :disabled="disabled"
        :class="classObject"
        @click="$emit('click')"
        :href="tag === 'a' ? href : false"
        :target="tag === 'a' && blank ? '_blank' : false"
        :download="tag === 'a' && download ? downloadName : false"
    >
        <span
            v-if="!!$slots.left"
            class="app-button__icon app-button__icon--left"
        >
            <slot name="left" />
        </span>
        <slot />
        <span
            v-if="!!$slots.right"
            class="app-button__icon app-button__icon--right"
        >
            <slot name="right" />
        </span>
    </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppButton extends Vue {
    @Prop(Boolean) readonly blank!: boolean
    @Prop(Boolean) readonly rounded!: boolean
    @Prop(Boolean) readonly disabled!: boolean
    @Prop(Boolean) readonly download!: boolean
    @Prop(Boolean) readonly autoWidth!: boolean

    @Prop({
        type: String,
        default: '#'
    }) readonly href!: string

    @Prop({
        type: String,
        default: 'button'
    }) readonly tag!: string

    @Prop({
        type: String,
        default: 'file'
    }) readonly downloadName!: string

    @Prop({
        type: String,
        default: 'l',
        validator (value: string): boolean {
            return ['s', 'm', 'l'].includes(value)
        }
    }) readonly size!: string

    @Prop({
        type: String,
        default: 'yellow',
        validator (value: string): boolean {
            return ['yellow', 'red', 'blue'].includes(value)
        }
    }) readonly theme!: string

    get classObject (): [{[elem: string]: boolean}, string, string] {
        return [
            {
                'app-button--rounded': this.rounded,
                'app-button--disabled': this.disabled,
                'app-button--auto-width': this.autoWidth
            },
            `app-button--size-${this.size}`,
            `app-button--theme-${this.theme}`
        ]
    }
}
</script>

<style lang="scss">
.app-button {
    $z-button: '.z-button';

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.6875rem 0.625rem 0.625rem;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.2;
    text-align: center;
    text-decoration: none;
    border: 0;
    outline: 0;
    transition: background-color $transition, color $transition;
    user-select: none;
    cursor: pointer;

    &--disabled {
        opacity: .5;
        pointer-events: none;
    }

    &--rounded {
        border-radius: .5rem;
    }

    &--auto-width {
        width: auto;
    }

    &--theme {

        &-yellow {
            color: $yellow-darker;
            background-color: $yellow;

            &:hover {
                background-color: $yellow-dark;
            }
        }

        &-red {
            color: $white;
            background-color: $red;

            &:hover {
                background-color: $red-dark;
            }
        }

        &-blue {
            color: $white;
            background-color: $gray-darker;

            &:hover {
                background-color: $gray-darkerer;
            }
        }
    }
}
</style>
