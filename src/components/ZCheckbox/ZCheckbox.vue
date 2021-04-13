<template>
    <div class="z-checkbox-wrapper">
        <label
            :for="name"
            class="z-checkbox"
            :class="{
                'is-checked': check,
                'is-disabled': disabled
            }"
        >
            <input
                :id="name"
                :name="name"
                :checked="check"
                :disabled="disabled"
                @change="change($event.target.checked)"
                type="checkbox"
            />
            <span class="z-checkbox__box"></span>
            <span class="z-checkbox__text">
                <slot />
            </span>
        </label>
        <span
            class="z-checkbox__error"
            v-show="required && error"
        >
            <span v-show="!check">{{ $t('text.error') }}</span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'z-checkbox',
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

<style lang="scss" src="./index.scss"></style>
