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

<script>
export default {
    name: 'app-tabs',
    props: {
        inverted: Boolean,
        theme: {
            type: String,
            default: 'light'
        }
    },
    data () {
        return {
            openedItem: {
                id: {
                    type: String,
                    default: ''
                }
            }
        }
    },
    mounted () {
        this.defaultState()

        this.$on('toggle-item', data => this.openHandler(data))
    },
    beforeDestroy () {
        this.$off('toggle-item', data => this.openHandler(data))
    },
    methods: {
        openHandler (data) {
            this.openedItem.id = data

            for (let i = 0; i < this.$children.length; i++) {
                if (this.$children[i].itemId === this.openedItem.id) {
                    this.$children[i].state = true
                } else {
                    this.$children[i].state = false
                };
            };
        },
        defaultState () {
            const label = this.$children.filter(item => item.name === 'app-tabs-label')[0]
            const content = this.$children.filter(item => item.name === 'app-tabs-content')[0]

            label.state = true
            content.state = true
        },
        closeAll () {
            for (let i = 0; i < this.$children.length; i++) {
                this.$children[i].state = false
            };
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
