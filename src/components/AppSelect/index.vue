<template>
    <div :class="elementClass('app-select')">
        <div
            class="app-select__container"
            @click.self="opened = !opened"
        >
            <span
                v-html="placeholder"
                class="app-select__placeholder"
                v-show="placeholder && !selected.text.length"
            ></span>
            <span
                v-html="selected.text"
                class="app-select__selected"
                v-show="selected.text.length"
            ></span>
            <span class="app-select__arrow"></span>
        </div>
        <div :class="elementClass('app-select__dropdown')">
            <ul class="app-select__options">
                <li
                    :key="option.id"
                    v-html="option.text"
                    v-for="option in options"
                    class="app-select__option"
                    :class="optionClass(option)"
                    @click="changeSelected(option)"
                ></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, PropSync } from 'vue-property-decorator'

type Option = {
    id: string,
    text: string,
    selected: boolean,
    disabled: boolean
}

@Component
export default class AppSelect extends Vue {
    @Prop(String) readonly placeholder!: string
    @Prop({
        type: String,
        required: true
    }) readonly name!: string

    @PropSync('data', {
        type: Array,
        default: ''
    }) readonly options!: Option[]

    opened: boolean
    selected: {
        id: string,
        text: string
    }

    constructor () {
        super()
        this.opened = false
        this.selected = {
            id: '',
            text: ''
        }
    }

    mounted (): void {
        this.onLoad()

        document.addEventListener('click', (e: {[elem: string]: any}) => this.hideDropdown(e))
    }

    onLoad (): void {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].selected) this.initSelected(this.options[i])
        }
    }

    elementClass (classname: string): string {
        let result = classname

        if (this.opened) result += ` ${classname}--opened`

        return result
    }

    optionClass (option: Option): [string, {[elem: string]: boolean}] {
        return [
            'app-select__option',
            {
                'app-select__option--selected': option.selected,
                'app-select__option--disabled': option.disabled
            }
        ]
    }

    hideDropdown (e: {[elem: string]: any}): void {
        const el = this.$el as HTMLElement
        const isOutside: boolean = el !== e.target && !el.contains(e.target)

        if (isOutside) this.opened = false
    }

    changeSelected (option: Option): void {
        option.selected ? this.removeSelected() : this.addSelected(option)
        this.opened = false
        this.$emit('input', this.selected.text)
    }

    initSelected (option: Option): void {
        this.selected.id = option.id
        this.selected.text = option.text

        for (let i = 0; i < this.options.length; i++) {
            this.options[i].selected = this.options[i].id === option.id
        }
    }

    addSelected (option: Option): void {
        this.selected.id = option.id
        this.selected.text = option.text

        for (let i = 0; i < this.options.length; i++) {
            this.options[i].selected = this.options[i].id === option.id
        }
    }

    removeSelected (): void {
        this.opened = false
        this.selected.id = ''
        this.selected.text = ''

        for (let i = 0; i < this.options.length; i++) this.options[i].selected = false
    }
}
</script>

<style lang="scss">
.app-select {
    $padding: 1rem;

    width: 100%;
    position: relative;
    background-color: $gray-lite;
    box-shadow: inset 0 0 0 1px $blue-dark;
    user-select: none;

    &__container {
        overflow: hidden;
        padding: 1rem 2rem 1rem 1rem;
        position: relative;
        cursor: pointer;
    }

    &__selected {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
        line-height: 1.4;
        color: $blue-dark;
        font-size: .875rem;
        pointer-events: none;

    }

    &__placeholder {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
        line-height: 1.4;
        font-size: .875rem;
        color: rgba($blue-dark, .5);
        pointer-events: none;
    }

    &__clear {
        display: inline-block;
        vertical-align: middle;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        right: 42px;
        z-index: 2;
        border-radius: 50%;
        background-color: $white;
        box-shadow: inset 0 0 0 1px $gray-dark;
        transform: translateY(-50%);
        transition: background-color $transition, box-shadow $transition;

        &:before,
        &:after {
            content: '';
            display: block;
            width: .75rem;
            height: .125rem;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: $gray-dark;
            margin: auto;
            transition: background-color $transition;
            z-index: 1;
        }

        &:before {
            transform: rotate(45deg);
        }

        &:after {
            transform: rotate(-45deg);
        }

        &:hover {
            background-color: $blue-lite;
            box-shadow: none;

            &:before,
            &:after {
                background-color: $yellow-dark;
            }
        }
    }

    &__arrow {
        display: block;
        width: 0;
        height: 0;
        margin: auto;
        position: absolute;
        top: 0;
        right: .75rem;
        bottom: 0;
        z-index: 2;
        border: 4px solid transparent;
        border-top: 8px solid $blue-dark;
        border-bottom: 0;
        pointer-events: none;
    }

    &__dropdown {
        display: none;
        width: 100%;
        overflow: auto;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 10;
        background-color: $gray-lite;
        filter: drop-shadow(0px 2px 12px rgba(8, 61, 140, 0.14));
        transition: opacity $transition;

        &--opened {
            display: block;
        }
    }

    &__options {
        margin: 0;
    }

    &__option {
        padding: 1rem;
        font-weight: 400;
        line-height: 1.4;
        font-size: .875rem;
        color: rgba($blue-dark, .5);
        transition: background-color $transition;
        cursor: pointer;

        &:hover {
            background-color: $gray-dark;
        }

        &--selected {
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                right: .5rem;
                transform: translateY(-50%);
                width: 1.5rem;
                height: 1.5rem;
                background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.1211 8.41421L10.1212 16.4142L9.41411 17.1213L8.707 16.4142L4.99994 12.7071L6.41415 11.2929L9.4141 14.2929L16.7069 7L18.1211 8.41421Z' fill='rgba(245, 191, 0, 1)'/%3E%3C/svg%3E");
                background-position: 50% 50%;
                background-repeat: no-repeat;
            }
        }

        &--disabled {
            opacity: .5;
            pointer-events: none;
        }
    }

    &--opened {

        .app-select__arrow {
            transform: rotate(180deg);
        }
    }
}
</style>
