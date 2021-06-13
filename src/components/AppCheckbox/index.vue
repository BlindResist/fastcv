<template>
    <div class="app-checkbox-wrapper">
        <label
            :for="name"
            class="app-checkbox"
            :class="{
                'app-checkbox--checked': check,
                'app-checkbox--disabled': disabled
            }"
        >
            <input
                :id="name"
                :name="name"
                type="checkbox"
                :checked="check"
                :disabled="disabled"
                @change="change($event.target.checked)"
            />
            <span class="app-checkbox__box"></span>
            <span class="app-checkbox__text">
                <slot />
            </span>
        </label>
        <span
            class="app-checkbox__error"
            v-show="required && error"
        >
            <span v-show="!check">{{ text.error }}</span>
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppCheckbox extends Vue {
    @Prop(Boolean) readonly checked!: boolean
    @Prop(Boolean) readonly disabled!: boolean
    @Prop(Boolean) readonly required!: boolean
    @Prop({
        type: String,
        required: true
    }) readonly name!: string

    error: boolean
    focus: boolean
    text: {
        error: string
    }

    constructor () {
        super()
        this.error = false
        this.focus = false
        this.text = {
            error: 'Required field'
        }
    }

    get check (): boolean {
        return this.checked
    }

    set check (value: boolean) {
        this.$emit('change', value)
    }

    change (value: boolean): void {
        this.check = value
        this.validate()
        this.$emit('change', value)
    }

    validate (): void {
        this.error = this.required && !this.check
    }
}
</script>

<style lang="scss">
.app-checkbox {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    width: 100%;
    user-select: none;
    cursor: pointer;

    input {
        display: none;
    }

    &__box,
    &__text {
        font-size: .875rem;
        font-weight: 400;
        color: $blue-dark;
        line-height: 1.5rem;
    }

    &__box {
        display: block;
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
        position: relative;
        border: 0;

        &::before {
            content: '';
            width: 1.5rem;
            height: 1.5rem;
            position: absolute;
            top: 0;
            left: 0;
            background-color: transparent;
            box-shadow: inset 0 0 0 1px $blue-dark;
            transition: box-shadow $transition, background-color $transition;
        }

        &::after {
            content: '';
            width: 1.125rem;
            height: 1.125rem;
            opacity: 0;
            position: absolute;
            top: 3px;
            left: 3px;
            background-color: $yellow;
            transition: background-color $transition, opacity $transition;
        }
    }

    &:hover {

        .app-checkbox__box {

            &::before {
                box-shadow: inset 0 0 0 1px $yellow;
            }

            &::after {
                opacity: 1;
                background-color: $yellow;
            }
        }
    }

    &--checked {

        .app-checkbox__box {

            &::before {
                background-color: $yellow;
                box-shadow: inset 0 0 0 1px $yellow;
            }

            &::after {
                opacity: 1;
                background-position: center;
                background-repeat: no-repeat;
                background-color: $yellow;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSA1TDUgOUwxMyAxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+);
            }
        }

        &:hover {

            .app-checkbox__box {

                &::before {
                    background-color: $white;
                }
            }
        }
    }

    &--disabled {
        opacity: .1;
        pointer-events: none;
    }
}
</style>
