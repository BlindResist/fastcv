<template>
    <label
        :for="name"
        class="app-textarea"
        :class="{
            'is-error': error,
            'is-filled': val,
            'is-focused': focus,
            'is-resizable': resize,
            'is-disabled': disabled
        }"
    >
        <textarea
            cols="30"
            rows="10"
            :id="name"
            :name="name"
            :value="val"
            :disabled="disabled"
            @blur="focus = false"
            @focus="focus = true"
            @input="input($event.target.value)"
            @change="change($event.target.value)"
        ></textarea>
        <span
            v-show="placeholder && !focus && !val"
            v-html="placeholder"
            class="app-textarea__placeholder"
        ></span>
        <span
            class="app-textarea__error"
            v-show="required && error"
        >{{ text.errors.required }}</span>
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppTextarea extends Vue {
    @Prop(Boolean) readonly disabled!: boolean
    @Prop(Boolean) readonly resize!: boolean
    @Prop(Boolean) readonly required!: boolean
    @Prop(String) readonly placeholder!: string
    @Prop([Number, String]) readonly value!: number | string
    @Prop({
        type: String,
        required: true
    }) readonly name!: string

    error: boolean
    focus: boolean
    val!: number | string
    text: {
        errors: {
            required: string
        }
    }

    constructor () {
        super()
        this.error = false
        this.focus = false
        this.text = {
            errors: {
                required: this.lang === 'ru' ? 'Поле обязательно для заполнения' : 'Required field'
            }
        }
    }

    get lang (): string {
        return this.$store.state.lang
    }

    input (value: string): void {
        this.error = this.required && !value
        this.val = value
        this.$emit('input', value)
    }

    change (value: string): void {
        this.error = this.required && !value
        this.val = value
        this.$emit('change', value)
    }
}

</script>

<style lang="scss">
.app-textarea {
    $padding: 1rem;

    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    width: 100%;
    height: 8rem;
    padding: $padding;
    position: relative;
    border-radius: 0;
    background-color: $gray-lite;
    box-shadow: inset 0 0 0 1px $blue-dark;

    textarea {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        color: rgba(0, 0, 0, 1);
        border: none;
        resize: none;
        background-color: transparent;
    }

    textarea,
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
        padding: 1rem;
        position: absolute;
        top: 0;
        left: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(0, 0, 0, 0.50);
        pointer-events: none;
    }

    &__error {
        padding: .2rem 0 0;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
        color: rgba(231, 0, 15, 1);
        font-size: .65rem;
    }

    &.is-resizable {

        textarea {
            resize: both;
        }
    }

    &.is-error {
        box-shadow: inset 0 0 0 1px rgba(231, 0, 15, 1);
    }

    &.is-disabled {
        opacity: .8;
        pointer-events: none;
        background-color: rgb(235, 235, 228);
    }
}
</style>
