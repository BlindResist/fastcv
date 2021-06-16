<template>
    <div
        v-if="update"
        :class="elClass"
    >
        <tippy
            theme="light"
            appendTo="parent"
            :content="content"
            :trigger="trigger"
            :placement="placement"
            class="app-tooltip__tippy"
        >
            <template v-slot:trigger>
                <template v-if="!$slots.default">
                    <button class="app-tooltip__button">?</button>
                </template>
                <template v-else>
                    <slot />
                </template>
            </template>
        </tippy>
    </div>
</template>

<script lang="ts">
import 'tippy.js/themes/light.css'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class AppTooltip extends Vue {
    @Prop({
        type: String,
        default: ''
    }) readonly content!: string

    @Prop({
        type: String,
        default: 'right'
    }) readonly placement!: string

    @Prop({
        type: String,
        default: 'mouseenter'
    }) readonly trigger!: string

    @Prop({
        type: String,
        default: 'default'
    }) readonly theme!: string

    update: boolean

    constructor () {
        super()
        this.update = true
    }

    @Watch('content')
    onContentChanged (): void {
        this.update = false

        this.$nextTick(() => {
            this.update = true
        })
    }

    get elClass (): string[] {
        return [
            'app-tooltip',
            `app-tooltip--${this.theme}`
        ]
    }
}
</script>

<style lang="scss">
.app-tooltip {
    $parent: &;

    display: inline-flex;

    &__button {
        width: 1.25rem;
        height: 1.25rem;
        overflow: hidden;
        color: $white;
        font-weight: 700;
        font-size: .875rem;
        border: none;
        border-radius: 50%;
        background-color: $blue-lite;
        cursor: default;
    }

    .tippy-popper {

        .tippy-tooltip {
            font-weight: 400;
            text-align: left;
            font-size: .75rem;
            border-radius: .5rem;
            border: 1px solid currentColor;
            box-shadow: none;
        }
    }

    &--error {

        #{$parent}__button {
            background-color: $red;
        }
    }
}
</style>
