<template>
    <div
        @click="toggleItem"
        :class="classObject"
        class="app-tabs-label"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'app-tabs-label',
    props: {
        id: {
            type: String,
            default: '',
            required: true
        },
        rightSide: Boolean
    },
    data () {
        return {
            state: false,
            name: 'app-tabs-label',
            itemId: `tabs-${this.id}`,
            itemChildrens: this.$children
        }
    },
    computed: {
        classObject () {
            return {
                'app-tabs-label--opened': this.state,
                'app-tabs-label--right': this.rightSide
            }
        }
    },
    methods: {
        toggleItem () {
            this.$parent.$emit('toggle-item', this.itemId)
        }
    }
}
</script>
