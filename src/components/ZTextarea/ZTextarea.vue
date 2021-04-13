<template>
    <label
        :for="name"
        class="z-textarea"
        :class="{
            'is-error': error,
            'is-filled': val,
            'is-focused': focus,
            'is-resizable': resize,
            'is-disabled': disabled
        }"
    >
        <textarea
            :id="name"
            :name="name"
            :disabled="disabled"
            :value="val"
            @blur="focus = false"
            @focus="focus = true"
            @change="change($event.target.value)"
            cols="30"
            rows="10"
        ></textarea>
        <span
            v-show="placeholder && !focus && !val"
            v-html="placeholder"
            class="z-textarea__placeholder"
        ></span>
        <span
            class="z-textarea__error"
            v-show="required && error"
        >{{ text.errors.required }}</span>
    </label>
</template>

<script>
export default {
    name: 'z-textarea',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        name: {
            type: String,
            required: true
        },
        disabled: Boolean,
        resize: Boolean,
        required: Boolean,
        placeholder: String,
        value: [Number, String]
    },
    data () {
        return {
            error: false,
            focus: false,
            text: {
                errors: {
                    required: this.$root.lang === 'ru' ? 'Поле обязательно для заполнения' : 'Required field'
                }
            },
            val: this.value
        }
    },
    methods: {
        input (value) {
            if (this.required && !value) {
                this.error = true
            } else {
                this.error = false
            }
            this.val = value
            this.$emit('input', value)
        },
        change (value) {
            if (this.required && !value) {
                this.error = true
            } else {
                this.error = false
            }
            this.val = value
            this.$emit('change', value)
        }
    }
}

</script>

<style lang="scss" src="./index.scss"></style>
