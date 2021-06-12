<template>
    <a
        :href="link"
        :class="classObject"
        @click="click($event)"
        :target="blank ? '_blank' : false"
    ><slot /></a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppLink extends Vue {
    @Prop(Boolean) readonly blank!: boolean
    @Prop(Boolean) readonly prevent!: boolean
    @Prop({
        type: String,
        default: '#'
    }) readonly link!: string

    @Prop({
        type: String,
        default: 'yellow'
    }) readonly hover!: string

    @Prop({
        type: Boolean,
        default: true
    }) readonly underline!: boolean

    get classObject (): [string, string, {[elem: string]: boolean}] {
        return [
            'app-link',
            `app-link--hover-${this.hover}`,
            {
                'app-link--underline': this.underline
            }
        ]
    }

    click (e: Event): void {
        if (this.prevent) e.preventDefault()

        this.$emit('click')
    }
}
</script>

<style lang="scss">
.app-link {
    color: $black;
    transition: color $transition;

    &:visited,
    &:focus,
    &:active {
        outline: 0 none;
    }

    &--hover {

        &-yellow {

            &:hover {
                color: $yellow-dark;
            }
        }

        &-no {

            &:hover {
                color: $black;
            }
        }
    }

    &--underline {
        text-decoration: underline;
    }
}
</style>
