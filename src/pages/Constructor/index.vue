<template>
    <main class="page">
        <constructor :lang="lang" />
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

export default class ConstructorPage extends Vue {
    get lang (): string {
        return this.$store.state.lang
    }
}
</script>
