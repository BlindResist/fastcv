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

<script>
export default {
    name: 'app-input',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text',
            validator: prop => ['text', 'tel', 'email', 'password'].includes(prop)
        },
        theme: {
            type: String,
            default: 'text',
            validator: prop => ['text', 'search'].includes(prop)
        },
        position: {
            type: String,
            default: 'left',
            validator: prop => ['left', 'right'].includes(prop)
        },
        disabled: Boolean,
        required: Boolean,
        placeholder: String
    },
    data () {
        return {
            error: false,
            focus: false,
            text: {
                error: 'Required field',
                emailError: 'Invalid email format'
            }
        }
    },
    computed: {
        val: {
            get () {
                return this.$attrs.value
            },
            set (value) {
                this.$emit('input', value)
            }
        },
        objectClass () {
            return {
                'app-input--filled': this.val,
                'app-input--error': this.error,
                'app-input--focused': this.focus,
                'app-input--disabled': this.disabled,
                'app-input--tel': this.type === 'tel'
            }
        }
    },
    methods: {
        resetVal () {
            if (this.val.length > 0) {
                this.val = ''
                this.change('')
            }
        },
        change (value) {
            this.validate(value)
            this.$emit('change', value)
        },
        input (value) {
            this.validate(value)
            this.$emit('input', value)
        },
        checkEmail (value) {
            if (!this.validateEmail(value)) this.error = true
        },
        checkTel (value) {
            if (value.length < 17) this.error = true
        },
        validateEmail (email) {
            // eslint-disable-next-line no-useless-escape
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            return regex.test(email)
        },
        validate () {
            if (this.required && !this.val) {
                this.error = true
            } else {
                this.error = false

                if (this.type === 'email') {
                    this.checkEmail(this.val)
                } else if (this.type === 'tel') {
                    this.checkTel(this.val)
                }
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
    width: 100%;
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
