<template>
    <label
        :for="name"
        class="app-input"
        :class="objectClass"
    >
        <input
            :id="name"
            :name="name"
            :type="type"
            :value="val"
            autocomplete="off"
            :disabled="disabled"
            @blur="focus = false"
            @focus="focus = true"
            @input="input($event.target.value)"
            @change="change($event.target.value)"
            @keyup.enter="change($event.target.value)"
            :maxlength="type === 'tel' ? '17' : '255'"
        />
        <span
            v-html="placeholder"
            class="app-input__placeholder"
            v-if="placeholder && !focus && !val"
        ></span>
        <span
            class="app-input__error"
            v-if="required && error"
        >
            <span v-if="!val">{{ text.error }}</span>
            <span v-else-if="type === 'email'">{{ text.emailError }}</span>
        </span>
    </label>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class AppInput extends Vue {
    @Prop(Boolean) readonly disabled!: boolean
    @Prop(Boolean) readonly required!: boolean

    @Prop({
        type: String,
        default: ''
    }) readonly placeholder!: string

    @Prop({
        type: String,
        required: true
    }) readonly name!: string

    @Prop({
        type: String,
        default: 'text',
        validator (value: string): boolean {
            return ['text', 'tel', 'email', 'password'].includes(value)
        }
    }) readonly type!: string

    @Prop({
        type: String,
        default: 'text',
        validator (value: string): boolean {
            return ['text', 'search'].includes(value)
        }
    }) readonly theme!: string

    @Prop({
        type: String,
        default: 'left',
        validator (value: string): boolean {
            return ['left', 'right'].includes(value)
        }
    }) readonly position!: string

    @PropSync('value', {
        type: [Number, String],
        default: ''
    }) readonly val!: number | string

    error: boolean
    focus: boolean
    text: {
        error: string,
        emailError: string
    }

    constructor () {
        super()
        this.error = false
        this.focus = false
        this.text = {
            error: 'Required field',
            emailError: 'Invalid email format'
        }
    }

    get objectClass (): {[elem: string]: boolean | string | number} {
        return {
            'app-input--filled': this.val,
            'app-input--error': this.error,
            'app-input--focused': this.focus,
            'app-input--disabled': this.disabled,
            'app-input--tel': this.type === 'tel'
        }
    }

    resetVal (): void {
        if (this.val) {
            this.change('')
        }
    }

    change (value: string): void {
        this.validate(value)
        this.$emit('change', value)
    }

    input (value: string): void {
        this.validate(value)
        this.$emit('input', value)
    }

    checkEmail (value: string): void {
        if (!this.validateEmail(value)) this.error = true
    }

    checkTel (value: string): void {
        if (value.length < 17) this.error = true
    }

    validateEmail (email: string): boolean {
        // eslint-disable-next-line no-useless-escape
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return regex.test(email)
    }

    validate (value: string): void {
        if (this.required && !value) {
            this.error = true
        } else {
            this.error = false

            if (this.type === 'email') {
                this.checkEmail(value)
            } else if (this.type === 'tel') {
                this.checkTel(value)
            }
        }
    }
}

</script>

<style lang="scss">
.app-input {
    $padding: 1rem;

    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    padding: $padding;
    position: relative;
    background-color: $gray-lite;
    box-shadow: inset 0 0 0 1px $blue-dark;

    input {
        width: 100%;
        border: none;
        padding: 0;
        background-color: transparent;

        &:hover,
        &:focus {
            outline: 0 none;
        }

        &:invalid {
            box-shadow: none;
        }

        &::-ms-clear {
            display: none;
        }
    }

    input,
    &__placeholder {
        font-weight: 400;
        line-height: 1.4;
        color: $blue-dark;
        font-size: .875rem;
    }

    &__placeholder {
        display: block;
        max-width: 100%;
        overflow: hidden;
        padding: $padding;
        position: absolute;
        top: 0;
        left: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba($blue-dark, .5);
        pointer-events: none;
    }

    &__error {
        padding-top: .25rem;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
        color: $red;
        font-size: .75rem;
        font-weight: 400;
        line-height: 1.4;
    }

    &--disabled {
        opacity: .1;
        pointer-events: none;
    }

    &--error {
        box-shadow: inset 0 0 0 1px $red;
    }
}
</style>
