<template>
    <div
        v-show="state"
        class="app-tabs-content"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppTabsContent extends Vue {
    @Prop({
        type: String,
        required: true
    }) readonly id!: string

    name: string
    itemId: string

    constructor () {
        super()
        this.name = 'app-tabs-content'
        this.itemId = `tabs-${this.id}`
    }

    get state (): boolean {
        return this.$store.state.tabAsideActive === this.itemId
    }
}
</script>
