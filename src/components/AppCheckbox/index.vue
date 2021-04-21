<template>
    <div class="app-checkbox-wrapper">
        <label
            :for="name"
            class="app-checkbox"
            :class="{
                'is-checked': check,
                'is-disabled': disabled
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
            <span v-show="!check">{{ $t('text.error') }}</span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'app-checkbox',
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        name: {
            type: String,
            required: true
        },
        checked: Boolean,
        disabled: Boolean,
        required: Boolean
    },
    data () {
        return {
            error: false,
            focus: false
        }
    },
    computed: {
        check: {
            get () {
                return this.checked
            },
            set (value) {
                this.$emit('change', value)
            }
        }
    },
    methods: {
        change (value) {
            this.check = value
            this.validate()
            this.$emit('change', value)
        },
        validate () {
            if (this.required && !this.check) {
                this.error = true
            } else {
                this.error = false
            }
        }
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
        color: $black;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
    }

    &__box {
        position: relative;
        display: block;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        border: 0;
        margin-right: 16px;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 24px;
            height: 24px;
            background-color: $white;
            box-shadow: inset 0 0 0 1px $gray-dark;
            transition: box-shadow $transition, background-color $transition;
        }

        &::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 18px;
            height: 18px;
            background-color: $yellow;
            opacity: 0;
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

    &.is-checked {

        .app-checkbox__box {

            &::before {
                background-color: $yellow;
                box-shadow: inset 0 0 0 1px $yellow;
            }

            &::after {
                background-position: center;
                background-repeat: no-repeat;
                background-color: $yellow;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSA1TDUgOUwxMyAxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+);
                opacity: 1;
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

    &.is-disabled {
        opacity: .1;
        pointer-events: none;
    }
}
</style>
