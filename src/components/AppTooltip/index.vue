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

<script>
import 'tippy.js/themes/light.css'

export default {
    name: 'app-tooltip',
    props: {
        content: {
            type: String,
            default: ''
        },
        placement: {
            type: String,
            default: 'right'
        },
        trigger: {
            type: String,
            default: 'mouseenter'
        },
        theme: {
            type: String,
            default: 'default'
        }
    },
    data () {
        return {
            update: true
        }
    },
    watch: {
        content () {
            this.update = false

            this.$nextTick(() => {
                this.update = true
            })
        }
    },
    computed: {
        elClass () {
            return [
                'app-tooltip',
                `app-tooltip--${this.theme}`
            ]
        }
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
