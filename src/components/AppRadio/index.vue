<template>
    <div class="app-radio-wrapper">
        <div
            :key="index"
            :class="[
                'app-radio',
                {
                    'app-radio--disabled' : item.disabled
                }
            ]"
            v-for="(item, index) in options"
        >
            <input
                type="radio"
                :name="name"
                v-model="val"
                :value="item.id"
                class="app-radio__input"
                :id="`${name}_${index}`"
                :disabled="item.disabled"
                @input="onInput($event.target.value)"
                @change="onChange($event.target.value)"
            />
            <label
                class="app-radio__label"
                :for="`${name}_${index}`"
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

<script>
export default {
    name: 'app-radio',
    props: {
        options: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        required: Boolean
    },
    data () {
        return {
            error: false,
            focus: false,
            text: {
                error: this.$root.lang === 'ru' ? 'Поле обязательно для заполнения' : 'Required field'
            }
        }
    },
    computed: {
        val: {
            get () {
                return this.$attrs.value
            },
            set (value) {
                const optionsVal = this.options.map(item => item.id)

                if (optionsVal.includes(value)) {
                    this.$emit('input', value)
                } else {
                    console.error(`error value: ${value}`)
                }
            }
        }
    },
    methods: {
        onChange (value) {
            this.validate(value)
            this.$emit('input', value)
        },
        onInput (value) {
            this.validate(value)
            this.$emit('input', value)
        },
        validate () {
            if (this.required && !this.val) {
                this.error = true
            } else {
                this.error = false
            }
        }
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
        position: relative;
        display: flex;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
        color: $black;
        cursor: pointer;
        transition: color $transition;
        padding-left: 39px;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 24px;
            height: 24px;
            border-radius: 100%;
            background-color: $white;
            box-shadow: inset 0 0 0 1px $gray-dark;
            transition: box-shadow $transition, background-color $transition, opacity $transition;
        }

        &::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 18px;
            height: 18px;
            background-color: $yellow;
            border-radius: 100%;
            opacity: 0;
            transition: opacity $transition, background-color $transition;
        }

        &:hover {

            &::before {
                box-shadow: inset 0 0 0 1px $yellow;
            }
        }

        &:active {

            &::before {
                background-color: $white;
                box-shadow: inset 0 0 0 1px $yellow;
            }
        }
    }

    &__input:checked + .app-radio__label {

        &::before {
            background-color: $white;
            box-shadow: inset 0 0 0 1px $yellow;
        }

        &::after {
            opacity: 1;
        }
    }

    &__error {
        color: $red;
        font-size: 16px;
        line-height: 1.4;
    }
}
</style>
