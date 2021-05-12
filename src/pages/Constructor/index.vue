<template>
    <main class="page">
        <constructor :lang="lang" />
    </main>
</template>

<script>
import Constructor from '@/views/Constructor/index.vue'

export default {
    name: 'constructor-page',
    components: {
        Constructor
    },
    computed: {
        lang () {
            return this.$root.lang
        }
    }
}
</script>
