<template>
    <a
        :href="link"
        class="app-link"
        @click="click($event)"
    >
        <slot />
    </a>
</template>

<script>
export default {
    name: 'app-link',
    props: {
        link: {
            type: String,
            default: '#'
        },
        prevent: Boolean
    },
    data () {
        return {}
    },
    methods: {
        click (e) {
            if (this.prevent) e.preventDefault()

            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
.app-link {}
</style>
