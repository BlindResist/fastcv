<template>
    <component
        :is="tag"
        :class="classObject"
    >
        <slot />
    </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppTitle extends Vue {
    @Prop(Boolean) readonly invert!: boolean
    @Prop(Boolean) readonly comment!: boolean
    @Prop(Boolean) readonly bordered!: boolean
    @Prop(Boolean) readonly uppercase!: boolean

    @Prop({
        type: String,
        default: 'h1'
    }) readonly tag!: string

    @Prop({
        type: String,
        default: ''
    }) readonly text!: string

    @Prop({
        type: String,
        default: 'bold'
    }) readonly weight!: string

    get classObject (): [string, string, string, {[elem: string]: boolean}] {
        return [
            'app-title',
            `app-title--${this.tag}`,
            `app-title--${this.weight}`,
            {
                'app-title--invert': this.invert,
                'app-title--bordered': this.bordered,
                'app-title--uppercase': this.uppercase
            }
        ]
    }
}
</script>

<style lang="scss">
.app-title {
    line-height: 1.25;
    color: $blue-dark;

    &--invert {
        color: $white;
    }

    &--bordered {
        padding-bottom: 1rem;
        border-bottom: 3px solid $blue-dark;
    }

    &--uppercase {
        text-transform: uppercase;
    }

    &--normal {
        font-weight: 400;
    }

    &--bold {
        font-weight: 700;
    }

    &--h1 {
        font-size: 3rem;
    }

    &--h2 {
        font-size: 2rem;
    }

    &--h3 {
        font-size: 1.5rem;
    }

    &--h4 {
        font-size: 1.25rem;
    }

    &--h5 {
        font-size: 1.125rem;
    }

    &--h6 {
        font-size: 1rem;
    }
}
</style>
