<template>
    <main class="page">
        <constructor />
    </main>
</template>

<script lang="ts">
import Constructor from '@/views/Constructor/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Constructor
    }
})

export default class ConstructorPage extends Vue {}
</script>
