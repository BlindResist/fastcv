<template>
    <div
        v-show="state"
        class="app-tabs-content"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'app-tabs-content',
    props: {
        id: {
            type: String,
            default: '',
            required: true
        }
    },
    data () {
        return {
            state: false,
            name: 'app-tabs-content',
            itemId: `tabs-${this.id}`
        }
    }
}
</script>
