<template>
    <div class="app-radio-wrapper">
        <div
            :key="index"
            v-for="(item, index) in options"
            :class="elementClass(item.disabled)"
        >
            <input
                type="radio"
                :name="name"
                v-model="val"
                :value="item.id"
                class="app-radio__input"
                :id="`${name}-${index}`"
                :disabled="item.disabled"
                @input="onInput($event.target.value)"
                @change="onChange($event.target.value)"
            />
            <label
                class="app-radio__label"
                :for="`${name}-${index}`"
            >
                <span
                    v-html="item.text"
                    class="app-radio__text"
                ></span>
            </label>
        </div>
        <span
            class="app-radio__error"
            v-if="required && error"
        >
            <span v-if="!val">{{ text.error }}</span>
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

type Option = {
    id: string,
    text: string,
    disabled: boolean
}

@Component

export default class AppRadio extends Vue {
    @Prop(Boolean) readonly required!: boolean
    @Prop({
        type: Array,
        required: true
    }) readonly data!: Option[]

    @Prop({
        type: String,
        required: true
    }) readonly name!: string

    error: boolean
    focus: boolean
    options: Option[]
    text: {
        error: string
    }

    constructor () {
        super()
        this.error = false
        this.focus = false
        this.options = this.data
        this.text = {
            error: this.lang === 'ru' ? 'Поле обязательно для заполнения' : 'Required field'
        }
    }

    get lang (): string {
        return this.$store.state.lang
    }

    get val (): string {
        return this.$attrs.value
    }

    @Watch('data')
    onDataChanged (newData: Option[]): void {
        this.options = newData
    }

    elementClass (state: boolean): [string, {[elem: string]: boolean}] {
        return [
            'app-radio',
            {
                'app-radio--disabled': state
            }
        ]
    }

    onChange (value: string): void {
        this.validate(value)
        this.$emit('input', value)
    }

    onInput (value: string): void {
        this.validate(value)
        this.$emit('input', value)
    }

    validate (value: string): void {
        this.error = this.required && !value
    }
}
</script>

<style lang="scss">
.app-radio {
    position: relative;
    user-select: none;

    &+& {
        margin-top: .5rem;
    }

    &--disabled {
        opacity: .5;
        pointer-events: none;

        .app-radio__label {
            cursor: default;
        }
    }

    &__input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 0;
        height: 0;
    }

    &__text {
        font-weight: 400;
        color: $blue-dark;
        font-size: .875rem;
        line-height: 1.5rem;
    }

    &__label {
        display: flex;
        height: 1.5rem;
        font-size: 1rem;
        padding-left: 39px;
        position: relative;
        color: $black;
        line-height: 1.5rem;
        transition: color $transition;
        cursor: pointer;

        &:before {
            content: '';
            width: 1.5rem;
            height: 1.5rem;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 100%;
            background-color: $white;
            transition: box-shadow $transition, background-color $transition, opacity $transition;
        }

        &:hover {

            &::before {
                box-shadow: inset 0 0 0 4px $yellow;
            }
        }

        &:active {

            &:before {
                background-color: $yellow;
                box-shadow: inset 0 0 0 4px $white;
            }
        }
    }

    &__input:checked + .app-radio__label {

        &::before {
            background-color: $yellow;
            box-shadow: inset 0 0 0 4px $white;
        }
    }

    &__error {
        color: $red;
        font-size: 1rem;
        line-height: 1.4;
    }
}
</style>
