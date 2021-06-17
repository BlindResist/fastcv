<template>
    <div
        @click="toggleItem"
        :class="classObject"
        class="app-tabs-label"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppTabsLabel extends Vue {
    @Prop(Boolean) readonly rightSide!: boolean
    @Prop({
        type: String,
        required: true
    }) readonly id!: string

    name: string
    itemId: string

    constructor () {
        super()
        this.name = 'app-tabs-label'
        this.itemId = `tabs-${this.id}`
    }

    get classObject (): {[elem: string]: boolean} {
        return {
            'app-tabs-label--opened': this.state,
            'app-tabs-label--right': this.rightSide
        }
    }

    get state (): boolean {
        return this.$store.state.tabAsideActive === this.itemId
    }

    toggleItem (): void {
        this.$store.commit('activateTab', this.itemId)
    }
}
</script>
