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

<script>
export default {
    name: 'app-radio',
    props: {
        data: {
            type: Array,
            required: true,
            default: () => []
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
            options: this.data,
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
    watch: {
        data (newData) {
            this.options = newData
        }
    },
    methods: {
        elementClass (state) {
            return [
                'app-radio',
                {
                    'app-radio--disabled': state
                }
            ]
        },
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
