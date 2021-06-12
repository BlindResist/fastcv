<template>
    <div
        class="app-tabs"
        :class="`app-tabs--theme-${this.theme}`"
    >
        <div class="app-tabs__container">
            <div class="app-tabs__header">
                <slot name="label" />
                <div class="app-tabs__additional">
                    <slot name="additional" />
                </div>
            </div>
        </div>
        <slot name="content" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppTabs extends Vue {
    @Prop({
        type: String,
        default: 'light'
    }) readonly theme!: string

    openedItem: {
        id: string
    }

    constructor () {
        super()
        this.openedItem = {
            id: ''
        }
    }
}
</script>

<style lang="scss">
.app-tabs {

    &__container {
        display: flex;
        overflow: hidden;
        overflow-x: auto;
        z-index: 1;
    }

    &__header {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 1 1 100%;
        background-color: $gray-lite;
    }

    &__additional {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 0 1rem;
        margin-left: auto;
    }

    &-label {
        display: block;
        position: relative;
        height: 100%;
        padding: 1rem 1.5rem;
        font-size: .875rem;
        font-weight: 700;
        line-height: 1.4;
        color: $blue-dark;
        text-decoration: none;
        transition: color .3s, opacity .3s;
        user-select: none;
        cursor: pointer;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }

        &--opened {
            background-color: $gray-dark;
        }

        &--right {
            margin-left: auto;
        }
    }

    &-content {
        background-color: $gray-dark;
    }
}
</style>
