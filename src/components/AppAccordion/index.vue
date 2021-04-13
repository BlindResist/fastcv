<template>
    <div class="app-accordion">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'app-accordion',
    props: {
        nested: Boolean,
        multiple: Boolean,
        initial: {
            type: String,
            default: 'closed',
            validator: prop => ['closed', 'opened', 'first'].includes(prop)
        }
    },
    data () {
        return {
            openedItemID: {
                type: String,
                default: ''
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
    watch: {
        initial () {
            this.defaultState()
        }
    },
    methods: {
        openHandler (data) {
            if (!this.openedItemID.length || this.openedItemID !== data.itemId) {
                this.openedItemID = data.itemId
            }

            if (this.multiple) return

            for (let i = 0; i < this.$children.length; i++) {
                if (this.$children[i].itemId !== this.openedItemID) this.$children[i].state = false
            }
        },
        defaultState () {
            if (this.initial === 'opened') this.toggleAll(true)
            if (this.initial === 'closed') this.toggleAll(false)
            if (this.initial === 'first') this.openByIndex(0)
        },
        toggleAll (state) {
            for (let i = 0; i < this.$children.length; i++) {
                this.$children[i].state = state
            }
        },
        openByIndex (index) {
            this.toggleAll(false)
            this.$nextTick(() => {
                this.$children[index].state = true
                this.openedItemID = this.$children[index].itemId
            })
        }
    }
}
</script>
